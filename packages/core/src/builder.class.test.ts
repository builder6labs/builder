import { Builder } from './builder.class';

describe('Builder', () => {
  test('trustedHosts', () => {
    expect(Builder.isTrustedHost('localhost')).toBe(true);
    expect(Builder.isTrustedHost('builder6.com')).toBe(true);
    expect(Builder.isTrustedHost('beta.builder6.com')).toBe(true);
    expect(Builder.isTrustedHost('qa.builder6.com')).toBe(true);
    expect(Builder.isTrustedHost('123-review-build.beta.builder6.com')).toBe(true);
  });

  test('arbitrary builder6.com subdomains', () => {
    expect(Builder.isTrustedHost('cdn.builder6.com')).toBe(false);
    expect(Builder.isTrustedHost('foo.builder6.com')).toBe(false);
    expect(Builder.isTrustedHost('evildomainbeta.builder6.com')).toBe(false);
  });

  test('add trusted host', () => {
    expect(Builder.isTrustedHost('example.com')).toBe(false);
    Builder.registerTrustedHost('example.com');
    expect(Builder.isTrustedHost('example.com')).toBe(true);
  });
});
