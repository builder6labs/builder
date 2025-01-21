const DEFAULT_TRUSTED_HOSTS = [
  '*.beta.builder6.com',
  'beta.builder6.com',
  'builder6.com',
  'localhost',
  'qa.builder6.com',
];

export function isFromTrustedHost(
  trustedHosts: string[] | undefined,
  e: { origin: string }
): boolean {
  if (!e.origin.startsWith('http') && !e.origin.startsWith('https')) {
    return false;
  }
  const url = new URL(e.origin),
    hostname = url.hostname;

  return (
    (trustedHosts || DEFAULT_TRUSTED_HOSTS).findIndex((trustedHost) =>
      trustedHost.startsWith('*.')
        ? hostname.endsWith(trustedHost.slice(1))
        : trustedHost === hostname
    ) > -1
  );
}
