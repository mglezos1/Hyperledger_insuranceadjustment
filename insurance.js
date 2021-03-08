/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class claim  extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const claim  = [
            {
                state : 'Under Review',
                name: 'Matthew',
                model: 'Prius',
                atFault: 'Undetermined',
                payout: 'Undetermined',
            },
            {
                state: 'Fault Determined',
                name:  'Jesse',
                model: 'Mustang',
                atFault: 'Yes',
                payout: 'Undetermined',
            },
            {
                state: 'Payout',
                name:  'Mark',
                model: 'Camry',
                atFault: 'No',
                payout: '30,000'
            },
            ];
            
        for (let i = 0; i < claim.length; i++) {
            claim[i].docType = 'claim';
            await ctx.stub.putState('CLAIM' + i, Buffer.from(JSON.stringify(claim[i])));
            console.info('Added <--> ', claim[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }
    async queryClaim(ctx, claimNumber) {
        const claimBytes = await ctx.stub.getState(claimNumber);
      if (!claimBytes ||claimBytes.length === 0) {
            throw new Error(`${claimNumber} does not exist`);
        }
        console.log(claimBytes.toString());
        return claimBytes.toString();
    }
    async createClaim(ctx, claimNumber, state, name, model, atFault, payout) {
        console.info('============= START : Create Claim ===========');
        const claim = {
            state,
            docType: 'claim',
            docType: 'claim',
            name,
            model,
            atFault,
            payout,
        };
        await ctx.stub.putState(claimNumber, Buffer.from(JSON.stringify(claim)));
        console.info('============= END : Create Claim ===========');
    }
    async queryAllClaims(ctx) {
        const startKey = '';
        const endKey = '';
        const allResults = [];
        for await (const {key, value} of ctx.stub.getStateByRange(startKey, endKey)) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: key, Record: record });
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }
    async changeStatus(ctx, claimNumber, newStatus) {
        console.info('============= START : changeStatus ===========');
        const claimBytes = await ctx.stub.getState(claimNuumber);
        if (!claimBytes || claimBytes.length === 0) {
            throw new Error(`${claimNumber} does not exist`);
        }
        const claim = JSON.parse(claimNumber.toString());
        claim.status = newStatus;
        await ctx.stub.putState(claimNumber, Buffer.from(JSON.stringify(claim)));
        console.info('============= END : changeStatus ===========');
    }

}

module.exports = insurance;
