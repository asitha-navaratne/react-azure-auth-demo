export const config = {
  appId: process.env.REACT_APP_AZURE_APP_ID,
  redirectUrl: "http://localhost:3000",
  scopes: ["user.read"],
  authority: process.env.REACT_APP_AZURE_AUTHORITY,
};
