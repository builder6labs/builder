import { isFromTrustedHost } from './is-from-trusted-host';

describe('isFromTrustedHost', () => {
  test('trustedHosts', () => {
    expect(isFromTrustedHost(undefined, { origin: 'https://localhost' })).toBe(
      true
    );
    expect(isFromTrustedHost(undefined, { origin: 'https://builder6.com' })).toBe(
      true
    );
    expect(
      isFromTrustedHost(undefined, { origin: 'https://beta.builder6.com' })
    ).toBe(true);
    expect(
      isFromTrustedHost(undefined, { origin: 'https://qa.builder6.com' })
    ).toBe(true);
    expect(
      isFromTrustedHost(undefined, {
        origin: 'https://123-review-build.beta.builder6.com',
      })
    ).toBe(true);
  });

  test('arbitrary builder6.com subdomains', () => {
    expect(
      isFromTrustedHost(undefined, { origin: 'https://cdn.builder6.com' })
    ).toBe(false);
    expect(
      isFromTrustedHost(undefined, { origin: 'https://foo.builder6.com' })
    ).toBe(false);
    expect(
      isFromTrustedHost(undefined, {
        origin: 'https://evildomainbeta.builder6.com',
      })
    ).toBe(false);
  });

  test('add trusted host', () => {
    expect(
      isFromTrustedHost(undefined, { origin: 'https://example.com' })
    ).toBe(false);
    expect(
      isFromTrustedHost(['example.com'], { origin: 'https://example.com' })
    ).toBe(true);
  });
});
