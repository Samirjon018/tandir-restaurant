function getSupabaseHost() {
  try {
    return process.env.SUPABASE_URL
      ? new URL(process.env.SUPABASE_URL.trim()).hostname
      : null;
  } catch {
    return null;
  }
}

const supabaseHost = getSupabaseHost();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: supabaseHost
      ? [
          {
            protocol: "https",
            hostname: supabaseHost,
            pathname: "/storage/v1/object/public/**",
          },
        ]
      : [],
  },
};

export default nextConfig;