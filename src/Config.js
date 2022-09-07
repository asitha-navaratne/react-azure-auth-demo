export const config = {
  appId: process.env.AZURE_APP_ID,
  redirectUrl: "http://localhost:3000",
  scopes: ["user.read"],
  authority: process.env.AZURE_AUTHORITY,
};
