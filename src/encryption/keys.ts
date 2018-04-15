import { KeyPair, PublicKey } from "./types";

export const USER = "mabucchi";

export const personalKey : KeyPair = {
    private : '-----BEGIN RSA PRIVATE KEY-----\nMIIBOgIBAAJBAK+mdbmWFXZuASskPoPaabTJnEidjQBtiln3pP6+UPoPQ8DAxZcI\nBMsj8b2CDkgClvOCUZUkWbaSbAoIB4cVOW8CAwEAAQJAenWoX/ImFoJNKEHFn/GX\nfuaMogfNtT2pll3UV5JiLGNuXzXMw6jVxm1Ivlg2XiNYI30l+vhYAzGhfsXv6yqk\nuQIhANSpO951Ips3YCAh9SUjoVIxDjx3fVA9NVytW207BpQTAiEA03JUSXt6EJ0W\ndb1dKMFEX4UORqfVd8v/FFimIhZYWLUCIG0dxK1ZVv9jg3wZUGrVBGJi71YRTYhN\nT8MU5FOAtNhnAiEAv9E+z26ZnIq1PlhsM7WoTjMJcWV+DPBd1dpZ1CCLQuUCIEq+\ncpv/WlZDEBkHbkghGmEMz4rFBhs5E9VeU+bVP8vS\n-----END RSA PRIVATE KEY-----',
    public : '-----BEGIN PUBLIC KEY-----\nMFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAK+mdbmWFXZuASskPoPaabTJnEidjQBt\niln3pP6+UPoPQ8DAxZcIBMsj8b2CDkgClvOCUZUkWbaSbAoIB4cVOW8CAwEAAQ==\n-----END PUBLIC KEY-----',
    name: 'FBHACK2018'
}

export const publicKeys : PublicKey[] = [
    {
        user: 'negebauer',
        name: 'HUNTER42',
        key: '-----BEGIN PUBLIC KEY-----\nMFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBANpUb2yP8L7HqNyb187j1QtWjk98gno0\n42NluuLyKt09aPkeg5NvpFv1Rkd5b72Yf3xjFmev4tqRy8afHeiEvA8CAwEAAQ==\n-----END PUBLIC KEY-----'   
    },
    {
        user: 'mabucchi',
        name: 'FBHACK2018',
        key: '-----BEGIN PUBLIC KEY-----\nMFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAK+mdbmWFXZuASskPoPaabTJnEidjQBt\niln3pP6+UPoPQ8DAxZcIBMsj8b2CDkgClvOCUZUkWbaSbAoIB4cVOW8CAwEAAQ==\n-----END PUBLIC KEY-----'   },
]


// { name: 'test',
//   private: '-----BEGIN RSA PRIVATE KEY-----\nMIIBOgIBAAJBANpUb2yP8L7HqNyb187j1QtWjk98gno042NluuLyKt09aPkeg5Nv\npFv1Rkd5b72Yf3xjFmev4tqRy8afHeiEvA8CAwEAAQJBAM7FFn2XWKYlyyubQGhE\n53iEceSfg6afPhbdun/CX4wEI0tAJM084myQuKxoyYb5aupu3RlKaxXLx0Ryokdu\nd7ECIQD6EG+cueGaKos1TmmISUaXGpOxLba6zihxPtgQYxG2GQIhAN+DKLu1lfGj\nOBAmzUBRv3xcLUfqpbXqnpS9VNk85zhnAiBpNUMQKHCPgTjCe7QQ3+twJYFf+QC5\nRYVkZ/FVq6jG+QIgFvL3lrZhS+svUXE6d9Us7Q7l01GDbDdHywvZj2iScRcCIAZ/\n07YXlb81OSGbG6a5RDkaERhEq2VU0z/oaePei4Tq\n-----END RSA PRIVATE KEY-----',
//   public: '-----BEGIN PUBLIC KEY-----\nMFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBANpUb2yP8L7HqNyb187j1QtWjk98gno0\n42NluuLyKt09aPkeg5NvpFv1Rkd5b72Yf3xjFmev4tqRy8afHeiEvA8CAwEAAQ==\n-----END PUBLIC KEY-----' }