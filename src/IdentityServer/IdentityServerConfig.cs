using System.Collections.Generic;
using System.Security.Claims;
using IdentityModel;
using IdentityServer4.Models;
using IdentityServer4.Quickstart.UI;
using IdentityServer4.Test;

namespace IdentityServer4
{
    public static class IdentityServerConfig
    {
        public static IEnumerable<ApiScope> GetApiScopes()
        {
            return new List<ApiScope>
            {
                new ApiScope(name: "Api1",   displayName: "Api1"),
                new ApiScope(name: "Api1.Read",  displayName: "Api1.Read"),
                new ApiScope(name: "Api1.Write", displayName: "Api1.Read"),
                new ApiScope(name: "Cluster", displayName: "Cluster")
            };
        }

        public static IEnumerable<ApiResource> GetApiResources()
        {
            var resources = new List<ApiResource>();

            var api1 = new ApiResource("Api1", new[] { JwtClaimTypes.Email, JwtClaimTypes.Role });
            api1.ApiSecrets.Add(new Secret("TFGB=?Gf3UvH+Uqfu_5p".Sha256()));
            resources.Add(api1);
            api1.Scopes.Add("Api1.Read");
            api1.Scopes.Add("Api1.Write");

            var orleans = new ApiResource("Cluster");
            orleans.ApiSecrets.Add(new Secret("@3x3g*RLez$TNU!_7!QW".Sha256()));
            resources.Add(orleans);

            return resources;
        }

        public static IEnumerable<Client> GetClients()
        {
            return new List<Client>
            {
                new Client
                {
                    ClientId = "ConsoleClient",
                    ClientName = "Console Client",
                    AllowedGrantTypes = GrantTypes.ResourceOwnerPasswordAndClientCredentials,
                    ClientSecrets =
                    {
                        new Secret("KHG+TZ8htVx2h3^!vJ65".Sha256())
                    },
                    Claims = new List<ClientClaim> {new ClientClaim(JwtClaimTypes.Role, "Admin")},
                    AllowedScopes =
                    {
                        "Api1", "Api1.Read", "Api1.Write", "Cluster",
                        JwtClaimTypes.Email,
                        JwtClaimTypes.Role
                    },
                    AllowOfflineAccess = true
                },
                new Client
                {
                    ClientId = "DesktopClient",
                    ClientName = "Desktop Client",
                    AllowedGrantTypes = GrantTypes.ResourceOwnerPasswordAndClientCredentials,
                    ClientSecrets =
                    {
                        new Secret("AHG+TdfghVx2h3^!vJ65".Sha256())
                    },
                    Claims = new List<ClientClaim> {new ClientClaim(JwtClaimTypes.Role, "Admin")},
                    AllowedScopes =
                    {
                        "Api1", "Api1.Read", "Api1.Write", "Cluster",
                        JwtClaimTypes.Email,
                        JwtClaimTypes.Role
                    },
                    AllowOfflineAccess = true,
                },
                new Client
                {
                    ClientId = "NativeClient",
                    ClientName = "Native Client",
                    ClientUri = Common.Config.NativeClientUrl,
                    ClientSecrets = {
                        new Secret("KHG+TZ8aaVx2h3^!vJ65".Sha256())
                    },
                    AllowedCorsOrigins = new List<string>(){Common.Config.NativeClientUrl},
                    AllowedGrantTypes = GrantTypes.Code,
                    RedirectUris = { Common.Config.NativeClientUrl },
                    PostLogoutRedirectUris = { Common.Config.NativeClientUrl },
                    RequireClientSecret = true,
                    RequirePkce = true,
                    AllowedScopes =
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        IdentityServerConstants.StandardScopes.Email,
                        "Api1", "Api1.Read", "Api1.Write", "Cluster"
                    },
                    AllowOfflineAccess = true,
                    RefreshTokenUsage = TokenUsage.ReUse
                },
                new Client
                {
                    ClientId = "WebClient",
                    ClientName = "Web Client",
                    AccessTokenType = AccessTokenType.Reference,
                    AllowedGrantTypes = GrantTypes.Code,
                    AllowOfflineAccess = true,
                    RequireConsent = true,
                    ClientSecrets =
                    {
                        new Secret(@"pckJ#MH-9f9K?+^Bzx&4".Sha256())
                    },
                    AllowedScopes =
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        IdentityServerConstants.StandardScopes.Email,
                        "Api1", "Api1.Read", "Api1.Write", "Cluster"
                    },
                    RedirectUris = { $"{Common.Config.WebClientUrl}/signin-oidc" }
                }
            };
        }

        public static List<TestUser> GetUsers()
        {
            return TestUsers.Users;
        }

        public static IEnumerable<IdentityResource> GetIdentityResources()
        {
            return new List<IdentityResource>
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
                new IdentityResources.Email()
            };
        }
    }
}