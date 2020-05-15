/*
    Copyright (c) 2020, salesforce.com, inc.
    All rights reserved.
    SPDX-License-Identifier: BSD-3-Clause
    For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
*/
'use strict';

import categoryFactory from '../models/Category';
import { getCommerceClientConfig } from '@sfcc-core/apiconfig';
import * as CommerceSdk from 'commerce-sdk';
import {
    getUserFromContext,
    requestWithTokenRefresh,
} from '@sfcc-core/core-graphql';

const getCategoryClient = async (config, context, refresh) => {
    const clientConfig = getCommerceClientConfig(config);
    clientConfig.headers.authorization = (
        await getUserFromContext(context, refresh)
    ).token;
    return new CommerceSdk.Product.ShopperProducts(clientConfig);
};

const getCategory = async (config, { id, levels = 1 }, context) => {
    return requestWithTokenRefresh(async refresh => {
        if (refresh) {
            context.setSessionProperty('basketId', undefined);
        }

        const productClient = await getCategoryClient(config, context, refresh);
        return productClient.getCategory({
            parameters: {
                id,
                siteId: config.COMMERCE_CLIENT_API_SITE_ID,
                levels,
            },
        });
    });
};

export const resolver = config => {
    return {
        Query: {
            category: async (_, { id, levels }, context) => {
                const apiCategory = await getCategory(
                    config,
                    { id, levels },
                    context,
                );
                const categoryInstance = categoryFactory(apiCategory, levels);

                return categoryInstance;
            },
        },
    };
};
