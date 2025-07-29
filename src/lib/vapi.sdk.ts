// import Vapi from "@vapi-ai/web";

// export const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN!);

import Vapi from "@vapi-ai/web";

if (!process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN) {
  throw new Error(
    "NEXT_PUBLIC_VAPI_WEB_TOKEN is not defined in environment variables"
  );
}

export const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN);
