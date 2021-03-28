import React from 'react';

const ServiceContext = React.createContext({});

export const ServiceProvider = ServiceContext.Provider;
export const ServiceConsumer = ServiceContext.Consumer;
export default ServiceContext;
