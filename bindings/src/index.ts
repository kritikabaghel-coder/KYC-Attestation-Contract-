import { Buffer } from "buffer";
import { Address } from '@stellar/stellar-sdk';
import {
  AssembledTransaction,
  Client as ContractClient,
  ClientOptions as ContractClientOptions,
  MethodOptions,
  Result,
  Spec as ContractSpec,
} from '@stellar/stellar-sdk/contract';
import type {
  u32,
  i32,
  u64,
  i64,
  u128,
  i128,
  u256,
  i256,
  Option,
  Typepoint,
  Duration,
} from '@stellar/stellar-sdk/contract';
export * from '@stellar/stellar-sdk'
export * as contract from '@stellar/stellar-sdk/contract'
export * as rpc from '@stellar/stellar-sdk/rpc'

if (typeof window !== 'undefined') {
  //@ts-ignore Buffer exists
  window.Buffer = window.Buffer || Buffer;
}


export const networks = {
  testnet: {
    networkPassphrase: "Test SDF Network ; September 2015",
    contractId: "CC3CHJHF3DJYJ7YWWDRCBFXFHV6HGGLD2AUVFVYX4CNQ46KYC2S6EUED",
  }
} as const

export type DataKey = {tag: "Admin", values: void} | {tag: "Issuer", values: readonly [string]} | {tag: "AttHash", values: readonly [string, string]} | {tag: "AttRev", values: readonly [string, string]} | {tag: "AttPub", values: readonly [string, string]} | {tag: "AttAllow", values: readonly [string, string, string]} | {tag: "SubjIssuers", values: readonly [string]};

export interface Client {
  /**
   * Construct and simulate a issue_kyc transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  issue_kyc: ({issuer, subject, hash, public}: {issuer: string, subject: string, hash: Buffer, public: boolean}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a is_issuer transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  is_issuer: ({issuer}: {issuer: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<boolean>>

  /**
   * Construct and simulate a add_issuer transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  add_issuer: ({issuer}: {issuer: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a initialize transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  initialize: ({admin}: {admin: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a revoke_kyc transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  revoke_kyc: ({issuer, subject}: {issuer: string, subject: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a set_public transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  set_public: ({subject, issuer, public}: {subject: string, issuer: string, public: boolean}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a verify_kyc transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  verify_kyc: ({verifier, subject}: {verifier: string, subject: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<boolean>>

  /**
   * Construct and simulate a remove_issuer transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  remove_issuer: ({issuer}: {issuer: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a allow_verifier transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  allow_verifier: ({subject, issuer, verifier, allowed}: {subject: string, issuer: string, verifier: string, allowed: boolean}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a get_attestation_hash transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_attestation_hash: ({subject, issuer}: {subject: string, issuer: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Option<Buffer>>>

}
export class Client extends ContractClient {
  static async deploy<T = Client>(
    /** Options for initializing a Client as well as for calling a method, with extras specific to deploying. */
    options: MethodOptions &
      Omit<ContractClientOptions, "contractId"> & {
        /** The hash of the Wasm blob, which must already be installed on-chain. */
        wasmHash: Buffer | string;
        /** Salt used to generate the contract's ID. Passed through to {@link Operation.createCustomContract}. Default: random. */
        salt?: Buffer | Uint8Array;
        /** The format used to decode `wasmHash`, if it's provided as a string. */
        format?: "hex" | "base64";
      }
  ): Promise<AssembledTransaction<T>> {
    return ContractClient.deploy(null, options)
  }
  constructor(public readonly options: ContractClientOptions) {
    super(
      new ContractSpec([ "AAAAAAAAAAAAAAAJaXNzdWVfa3ljAAAAAAAABAAAAAAAAAAGaXNzdWVyAAAAAAATAAAAAAAAAAdzdWJqZWN0AAAAABMAAAAAAAAABGhhc2gAAAPuAAAAIAAAAAAAAAAGcHVibGljAAAAAAABAAAAAA==",
        "AAAAAAAAAAAAAAAJaXNfaXNzdWVyAAAAAAAAAQAAAAAAAAAGaXNzdWVyAAAAAAATAAAAAQAAAAE=",
        "AAAAAgAAAAAAAAAAAAAAB0RhdGFLZXkAAAAABwAAAAAAAAAAAAAABUFkbWluAAAAAAAAAQAAAAAAAAAGSXNzdWVyAAAAAAABAAAAEwAAAAEAAAAAAAAAB0F0dEhhc2gAAAAAAgAAABMAAAATAAAAAQAAAAAAAAAGQXR0UmV2AAAAAAACAAAAEwAAABMAAAABAAAAAAAAAAZBdHRQdWIAAAAAAAIAAAATAAAAEwAAAAEAAAAAAAAACEF0dEFsbG93AAAAAwAAABMAAAATAAAAEwAAAAEAAAAAAAAAC1N1YmpJc3N1ZXJzAAAAAAEAAAAT",
        "AAAAAAAAAAAAAAAKYWRkX2lzc3VlcgAAAAAAAQAAAAAAAAAGaXNzdWVyAAAAAAATAAAAAA==",
        "AAAAAAAAAAAAAAAKaW5pdGlhbGl6ZQAAAAAAAQAAAAAAAAAFYWRtaW4AAAAAAAATAAAAAA==",
        "AAAAAAAAAAAAAAAKcmV2b2tlX2t5YwAAAAAAAgAAAAAAAAAGaXNzdWVyAAAAAAATAAAAAAAAAAdzdWJqZWN0AAAAABMAAAAA",
        "AAAAAAAAAAAAAAAKc2V0X3B1YmxpYwAAAAAAAwAAAAAAAAAHc3ViamVjdAAAAAATAAAAAAAAAAZpc3N1ZXIAAAAAABMAAAAAAAAABnB1YmxpYwAAAAAAAQAAAAA=",
        "AAAAAAAAAAAAAAAKdmVyaWZ5X2t5YwAAAAAAAgAAAAAAAAAIdmVyaWZpZXIAAAATAAAAAAAAAAdzdWJqZWN0AAAAABMAAAABAAAAAQ==",
        "AAAAAAAAAAAAAAANcmVtb3ZlX2lzc3VlcgAAAAAAAAEAAAAAAAAABmlzc3VlcgAAAAAAEwAAAAA=",
        "AAAAAAAAAAAAAAAOYWxsb3dfdmVyaWZpZXIAAAAAAAQAAAAAAAAAB3N1YmplY3QAAAAAEwAAAAAAAAAGaXNzdWVyAAAAAAATAAAAAAAAAAh2ZXJpZmllcgAAABMAAAAAAAAAB2FsbG93ZWQAAAAAAQAAAAA=",
        "AAAAAAAAAAAAAAAUZ2V0X2F0dGVzdGF0aW9uX2hhc2gAAAACAAAAAAAAAAdzdWJqZWN0AAAAABMAAAAAAAAABmlzc3VlcgAAAAAAEwAAAAEAAAPoAAAD7gAAACA=" ]),
      options
    )
  }
  public readonly fromJSON = {
    issue_kyc: this.txFromJSON<null>,
        is_issuer: this.txFromJSON<boolean>,
        add_issuer: this.txFromJSON<null>,
        initialize: this.txFromJSON<null>,
        revoke_kyc: this.txFromJSON<null>,
        set_public: this.txFromJSON<null>,
        verify_kyc: this.txFromJSON<boolean>,
        remove_issuer: this.txFromJSON<null>,
        allow_verifier: this.txFromJSON<null>,
        get_attestation_hash: this.txFromJSON<Option<Buffer>>
  }
}