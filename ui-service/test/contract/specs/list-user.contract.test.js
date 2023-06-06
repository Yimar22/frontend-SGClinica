import { provider } from '../config/init-pact.js';
import {Matchers} from '@pact-foundation/pact';

describe('User Service', () => {
    describe('When a request to list all User is made', () => {
        before(async () => {
            await provider.setup();

                await provider.addInteraction({
                    uponReceiving: 'a request to list all animals',
                    state: "has animals",
                    withRequest: {
                        method: 'GET',
                        path: '/animals'
                    },
                    willRespondWith: {
                        status: 200,
                        body: Matchers.eachLike({
                            name: Matchers.like('manchas'),
                            breed: Matchers.like("Bengali"),
                            gender: Matchers.like("Female"),
                            vaccinated: Matchers.boolean(true)
                        })
                    }
                });
        });

        after(() => provider.finalize());

        it('should return the correct data', async () => {
            // here will be added the expects
        });
    });
});