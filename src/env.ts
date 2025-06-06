const _domain = process.env.VERCEL_ENV?.match(/(production|local)/gi)
  ? process.env.VERCEL_PROJECT_PRODUCTION_URL!
  : process.env.VERCEL_BRANCH_URL!

const env = Object.freeze({
  environment: process.env.VERCEL_ENV || "local",
  domain: _domain,
  mal: {
    clientID: process.env.NEXT_PUBLIC_MAL_CLIENT_ID!,
    clientSecret: process.env.MAL_CLIENT_SECRET!,
  },
  jwtSecret: process.env.JWT_SECRET!,
})

export default env
