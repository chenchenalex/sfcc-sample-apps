/*
    Copyright (c) 2020, salesforce.com, inc.
    All rights reserved.
    SPDX-License-Identifier: BSD-3-Clause
    For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
*/
'use strict';

import { gql } from 'apollo-server-core';

export const typeDef = gql`
    extend type Query {
        category(id: String!, levels: Int, locale: String): TopLevelCategory
    }

    type TopLevelCategory {
        id: String!
        name: String
        categories: [Category]
        pageDescription: String
    }

    type Category {
        id: String!
        name: String
        pageDescription: String
    }
`;
