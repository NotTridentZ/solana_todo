import React, { useEffect, useState } from 'react';
import { AnchorProvider, Program, web3 } from '@project-serum/anchor';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { TODO_PROGORAM_PubKey } from '../constants/ProgramKey';
import idl from '../constants/todo_idl.json';

const { SystemProgram, Keypair } = web3;

const SolanaTodo = () => {
    const [provider, setProvider] = useState(null);
    const [program, setProgram] = useState(null);
    const [greeting, setGreeting] = useState(null);
    const wallet = useAnchorWallet();

    useEffect(() => {
        if (wallet) {
            const connection = new web3.Connection('https://api.devnet.solana.com', 'processed');
            const provider = new AnchorProvider(connection, wallet, {
                preflightCommitment: 'processed',
            });
            setProvider(provider);

            const program = new Program(idl, TODO_PROGORAM_PubKey, provider);
            setProgram(program);
        }
    }, [wallet]);

    const fetchGreeting = async () => {
        const account = await program.account.greeting.fetch(program.provider.wallet.publicKey);
        setGreeting(account.greeting);
    };

    const sendGreeting = async () => {
        await program.rpc.sendGreeting('Hello, Solana!', {
            accounts: {
                greeting: program.provider.wallet.publicKey,
                systemProgram: SystemProgram.programId,
            },
        });
        fetchGreeting();
    };

    return (
        <div>
        {wallet ? (
            <div className="container">
                <div className='row mt-3 fs-2 fst-italic fw-bold'>
                    <div className="col">
                        Solana
                    </div>
                    <div className="col">
                        Todo
                    </div>
                    <div className="col">
                        App
                    </div>
                </div>
                <hr/>
                <div className='row'>
                    <div className="col mt-3 fs-2 fw-bold">
                        Todo List
                    </div>
                </div>
                <hr/>
                <div className='row'>
                    <div className="col mt-3 fs-2 fw-bold">
                        Finished
                    </div>
                </div>
            </div>
        ) : (
            <h3>Please connect your wallet.</h3>
        )}
        </div>
    );
};

export default SolanaTodo;
