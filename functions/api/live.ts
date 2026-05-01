// Cloudflare Pages Function — proxies Twitch's Helix /streams endpoint.
// The only server-side piece in this repo (per CLAUDE.md "Stack" section).
// Returns { live: boolean, title?: string }, edge-cached 60s. Twitch
// credentials live in Pages env (encrypted) so the client never hits
// Twitch directly.

type Env = {
  TWITCH_CLIENT_ID: string;
  TWITCH_CLIENT_SECRET: string;
};

type Context = {
  env: Env;
  request: Request;
};

// Hardcoded — Kevin's channel. If the handle ever changes, edit here
// rather than threading another env var through the deploy.
const LOGIN = "ZilchGnu";

export const onRequest = async ({ env }: Context): Promise<Response> => {
  if (!env.TWITCH_CLIENT_ID || !env.TWITCH_CLIENT_SECRET) {
    // Secrets not configured — fail closed, but cache so we don't
    // hammer the function during a misconfiguration.
    return jsonResponse({ live: false }, 200, "public, s-maxage=60");
  }

  try {
    const token = await getAppAccessToken(env);
    const stream = await getStreamStatus(LOGIN, env.TWITCH_CLIENT_ID, token);
    const body = stream
      ? { live: true, title: stream.title }
      : { live: false };
    return jsonResponse(body, 200, "public, s-maxage=60");
  } catch {
    // Twitch outage or auth failure: render as offline so the page
    // never breaks. Cache this too — better than retrying every request.
    return jsonResponse({ live: false }, 200, "public, s-maxage=60");
  }
};

async function getAppAccessToken(env: Env): Promise<string> {
  const params = new URLSearchParams({
    client_id: env.TWITCH_CLIENT_ID,
    client_secret: env.TWITCH_CLIENT_SECRET,
    grant_type: "client_credentials",
  });
  const res = await fetch("https://id.twitch.tv/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });
  if (!res.ok) throw new Error(`twitch token: ${res.status}`);
  const json = (await res.json()) as { access_token: string };
  return json.access_token;
}

async function getStreamStatus(
  login: string,
  clientId: string,
  token: string,
): Promise<{ title: string } | null> {
  const url = `https://api.twitch.tv/helix/streams?user_login=${encodeURIComponent(login)}`;
  const res = await fetch(url, {
    headers: {
      "Client-Id": clientId,
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error(`twitch streams: ${res.status}`);
  const json = (await res.json()) as { data: Array<{ title: string }> };
  if (json.data && json.data.length > 0) {
    return { title: json.data[0].title };
  }
  return null;
}

function jsonResponse(
  body: unknown,
  status: number,
  cache: string,
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": cache,
    },
  });
}
