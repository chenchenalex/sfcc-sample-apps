/*
    Copyright (c) 2020, salesforce.com, inc.
    All rights reserved.
    SPDX-License-Identifier: BSD-3-Clause
    For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
*/
import { LightningElement, api } from 'lwc';

/**
 * Popular Categories component. Renders popular categories content.
 */
class PopularCategories extends LightningElement {
    @api popularCategoriesHeading;
}

export default PopularCategories;
