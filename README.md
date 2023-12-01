# Reusable React Components Library

This library contains a collection of reusable React components that can significantly streamline the development process of React-based projects. By leveraging these pre-built and thoroughly tested components, developers can save time and ensure a higher level of reliability in their applications. The library also promotes standardization across the organization, allowing for consistent development practices and making it easy to inject improvements into services without additional overhead.

## Installation

This is a private package which means you have to login with your github username with github access token. Before login, make sure that you have generate the github access token with appropriate permission i.e. Download Package permission. To generate github access token, please follow this link: [Create a Personal Access Token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-personal-access-token-classic)

Once you have generated the github access token then use the following command to login:

```
npm login --registry=https://npm.pkg.github.com --scope=@dastgyr1
```

Provide your github username and access token as password.

Once you are logged in, please use the following command to install the package

```
npm install @dastgyr1/rc-fe-core@latest
```

Following are the components supported by this library:

1. [Virtual Data Grid](./src/Components/VirtualDataGrid/README.md)
2. [Table](./src/Components/Table/README.md)
