import { DefaultViewKey } from 'model';
import React, { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { useConfigurationService } from 'services';
import { ViewRoute } from './views';

const Root: FC = () => {
    const { active: config } = useConfigurationService();
    const defaultView = config?.defaultView || DefaultViewKey;

    return (
        <Routes>
            <Route path="/">
                <Route index element={<Navigate to={`/${defaultView}`} />} />
                <Route path=":view" element={<ViewRoute />} />
            </Route>
        </Routes>
    );
};

export default Root;