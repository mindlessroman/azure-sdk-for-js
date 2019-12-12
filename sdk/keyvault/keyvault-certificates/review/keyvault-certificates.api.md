## API Report File for "@azure/keyvault-certificates"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import * as coreHttp from '@azure/core-http';
import { PagedAsyncIterableIterator } from '@azure/core-paging';
import { PipelineOptions } from '@azure/core-http';
import { PollerLike } from '@azure/core-lro';
import { PollOperationState } from '@azure/core-lro';
import { TokenCredential } from '@azure/core-http';

// @public
export type ActionType = "EmailContacts" | "AutoRenew";

// @public
export interface AdministratorContact {
    email?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
}

// @public
export type ArrayOneOrMore<T> = {
    0: T;
} & Array<T>;

// @public
export interface BackupCertificateOptions extends coreHttp.OperationOptions {
}

// @public
export interface BackupCertificateResult {
    readonly value?: Uint8Array;
}

// @public
export interface BeginCreateCertificateOptions extends CreateCertificateOptions, CertificatePollerOptions {
}

// @public
export interface BeginDeleteCertificateOptions extends CertificatePollerOptions {
}

// @public
export interface BeginRecoverDeletedCertificateOptions extends CertificatePollerOptions {
}

// @public
export class CertificateClient {
    constructor(vaultUrl: string, credential: TokenCredential, pipelineOptions?: PipelineOptions);
    backupCertificate(certificateName: string, options?: BackupCertificateOptions): Promise<Uint8Array | undefined>;
    beginCreateCertificate(certificateName: string, certificatePolicy: CertificatePolicy, options?: BeginCreateCertificateOptions): Promise<PollerLike<PollOperationState<KeyVaultCertificateWithPolicy>, KeyVaultCertificateWithPolicy>>;
    beginDeleteCertificate(certificateName: string, options?: BeginDeleteCertificateOptions): Promise<PollerLike<PollOperationState<DeletedCertificate>, DeletedCertificate>>;
    beginRecoverDeletedCertificate(certificateName: string, options?: BeginRecoverDeletedCertificateOptions): Promise<PollerLike<PollOperationState<KeyVaultCertificate>, KeyVaultCertificate>>;
    createIssuer(issuerName: string, provider: string, options?: CreateIssuerOptions): Promise<CertificateIssuer>;
    deleteCertificateOperation(certificateName: string, options?: DeleteCertificateOperationOptions): Promise<CertificateOperation>;
    deleteContacts(options?: DeleteContactsOptions): Promise<CertificateContact[] | undefined>;
    deleteIssuer(issuerName: string, options?: DeleteIssuerOptions): Promise<CertificateIssuer>;
    getCertificate(certificateName: string, options?: GetCertificateOptions): Promise<KeyVaultCertificateWithPolicy>;
    getCertificateOperation(certificateName: string, options?: GetCertificateOperationOptions): Promise<PollerLike<PollOperationState<CertificateOperation>, CertificateOperation>>;
    getCertificatePolicy(certificateName: string, options?: GetCertificatePolicyOptions): Promise<CertificatePolicy>;
    getCertificateVersion(certificateName: string, version: string, options?: GetCertificateVersionOptions): Promise<KeyVaultCertificate>;
    getContacts(options?: GetContactsOptions): Promise<CertificateContact[] | undefined>;
    getDeletedCertificate(certificateName: string, options?: GetDeletedCertificateOptions): Promise<DeletedCertificate>;
    getIssuer(issuerName: string, options?: GetIssuerOptions): Promise<CertificateIssuer>;
    importCertificate(certificateName: string, certificateValue: Uint8Array, options?: ImportCertificateOptions): Promise<KeyVaultCertificateWithPolicy>;
    listDeletedCertificates(options?: ListDeletedCertificatesOptions): PagedAsyncIterableIterator<DeletedCertificate, DeletedCertificate[]>;
    listPropertiesOfCertificates(options?: ListPropertiesOfCertificatesOptions): PagedAsyncIterableIterator<CertificateProperties, CertificateProperties[]>;
    listPropertiesOfCertificateVersions(certificateName: string, options?: ListPropertiesOfCertificateVersionsOptions): PagedAsyncIterableIterator<CertificateProperties, CertificateProperties[]>;
    listPropertiesOfIssuers(options?: ListPropertiesOfIssuersOptions): PagedAsyncIterableIterator<IssuerProperties, IssuerProperties[]>;
    mergeCertificate(certificateName: string, x509Certificates: Uint8Array[], options?: MergeCertificateOptions): Promise<KeyVaultCertificateWithPolicy>;
    purgeDeletedCertificate(certificateName: string, options?: PurgeDeletedCertificateOptions): Promise<null>;
    restoreCertificateBackup(backup: Uint8Array, options?: RestoreCertificateBackupOptions): Promise<KeyVaultCertificateWithPolicy>;
    setContacts(contacts: CertificateContact[], options?: SetContactsOptions): Promise<CertificateContact[] | undefined>;
    updateCertificatePolicy(certificateName: string, policy: CertificatePolicy, options?: UpdateCertificatePolicyOptions): Promise<CertificatePolicy>;
    updateCertificateProperties(certificateName: string, version: string, options?: UpdateCertificateOptions): Promise<KeyVaultCertificate>;
    updateIssuer(issuerName: string, options?: UpdateIssuerOptions): Promise<CertificateIssuer>;
    readonly vaultUrl: string;
}

// @public
export type CertificateContact = RequireAtLeastOne<CertificateContactAll> | undefined;

// @public
export interface CertificateContactAll {
    email: string;
    name: string;
    phone: string;
}

// @public
export interface CertificateContacts {
    contactList?: CertificateContact[];
    readonly id?: string;
}

// @public
export type CertificateContentType = "application/x-pem-file" | "application/x-pkcs12" | undefined;

// @public
export interface CertificateIssuer {
    accountId?: string;
    administratorContacts?: AdministratorContact[];
    createdOn?: Date;
    credentials?: IssuerCredentials;
    enabled?: boolean;
    id?: string;
    issuerProperties?: IssuerProperties;
    name?: string;
    organizationId?: string;
    password?: string;
    updatedOn?: Date;
}

// @public
export interface CertificateOperation {
    cancellationRequested?: boolean;
    certificateTransparency?: boolean;
    certificateType?: string;
    csr?: Uint8Array;
    error?: CertificateOperationError;
    readonly id?: string;
    issuerName?: string;
    requestId?: string;
    status?: string;
    statusDetails?: string;
    target?: string;
}

// @public
export interface CertificateOperationError {
    readonly code?: string;
    readonly innerError?: CertificateOperationError;
    readonly message?: string;
}

// @public
export interface CertificatePolicy {
    certificateTransparency?: boolean;
    certificateType?: string;
    contentType?: CertificateContentType;
    readonly createdOn?: Date;
    enabled?: boolean;
    enhancedKeyUsage?: string[];
    exportable?: boolean;
    issuerName?: WellKnownIssuer | string;
    keyCurveName?: KeyCurveName;
    keySize?: number;
    keyType?: KeyType;
    keyUsage?: KeyUsageType[];
    lifetimeActions?: LifetimeAction[];
    reuseKey?: boolean;
    subject?: string;
    subjectAlternativeNames?: SubjectAlternativeNames;
    readonly updatedOn?: Date;
    validityInMonths?: number;
}

// @public
export module CertificatePolicy {
    const Default: CertificatePolicy;
}

// @public
export type CertificatePolicyAction = "EmailContacts" | "AutoRenew";

// @public
export interface CertificatePollerOptions extends coreHttp.OperationOptions {
    intervalInMs?: number;
    resumeFrom?: string;
}

// @public
export interface CertificateProperties {
    readonly createdOn?: Date;
    enabled?: boolean;
    readonly expiresOn?: Date;
    id?: string;
    name?: string;
    notBefore?: Date;
    readonly recoveryLevel?: DeletionRecoveryLevel;
    tags?: CertificateTags;
    updatedOn?: Date;
    vaultUrl?: string;
    version?: string;
    readonly x509Thumbprint?: Uint8Array;
}

// @public
export type CertificateTags = {
    [propertyName: string]: string;
};

// @public
export interface CoreSubjectAlternativeNames {
    dnsNames?: string[];
    emails?: string[];
    upns?: string[];
}

// @public
export interface CreateCertificateOptions extends CertificateProperties, coreHttp.OperationOptions {
}

// @public
export interface CreateIssuerOptions extends coreHttp.OperationOptions {
    accountId?: string;
    administratorContacts?: AdministratorContact[];
    enabled?: boolean;
    organizationId?: string;
    password?: string;
}

// @public
export interface DeleteCertificateOperationOptions extends coreHttp.OperationOptions {
}

// @public
export interface DeleteContactsOptions extends coreHttp.OperationOptions {
}

// @public
export interface DeletedCertificate extends KeyVaultCertificateWithPolicy {
    readonly deletedOn?: Date;
    recoveryId?: string;
    readonly scheduledPurgeDate?: Date;
}

// @public
export interface DeleteIssuerOptions extends coreHttp.OperationOptions {
}

// @public
export type DeletionRecoveryLevel = "Purgeable" | "Recoverable+Purgeable" | "Recoverable" | "Recoverable+ProtectedSubscription";

// @public
export interface ErrorModel {
    readonly code?: string;
    readonly innerError?: ErrorModel;
    readonly message?: string;
}

// @public
export interface GetCertificateOperationOptions extends CertificatePollerOptions {
}

// @public
export interface GetCertificateOptions extends coreHttp.OperationOptions {
}

// @public
export interface GetCertificatePolicyOptions extends coreHttp.OperationOptions {
}

// @public
export interface GetCertificateVersionOptions extends coreHttp.OperationOptions {
}

// @public
export interface GetContactsOptions extends coreHttp.OperationOptions {
}

// @public
export interface GetDeletedCertificateOptions extends coreHttp.OperationOptions {
}

// @public
export interface GetIssuerOptions extends coreHttp.OperationOptions {
}

// @public
export interface GetPlainCertificateOperationOptions extends coreHttp.OperationOptions {
}

// @public
export interface ImportCertificateOptions extends coreHttp.OperationOptions {
    enabled?: boolean;
    password?: string;
    policy?: CertificatePolicy;
    tags?: CertificateTags;
}

// @public
export interface IssuerAttributes {
    readonly created?: Date;
    enabled?: boolean;
    readonly updated?: Date;
}

// @public
export interface IssuerCredentials {
    accountId?: string;
    password?: string;
}

// @public
export interface IssuerParameters {
    certificateTransparency?: boolean;
    certificateType?: string;
    name?: string;
}

// @public
export interface IssuerProperties {
    id?: string;
    name?: string;
    provider?: string;
}

// @public
export type KeyCurveName = "P-256" | "P-384" | "P-521" | "P-256K";

// @public
export type KeyType = "EC" | "EC-HSM" | "RSA" | "RSA-HSM";

// @public
export type KeyUsageType = "digitalSignature" | "nonRepudiation" | "keyEncipherment" | "dataEncipherment" | "keyAgreement" | "keyCertSign" | "cRLSign" | "encipherOnly" | "decipherOnly";

// @public
export interface KeyVaultCertificate {
    cer?: Uint8Array;
    id?: string;
    readonly keyId?: string;
    name: string;
    properties: CertificateProperties;
    readonly secretId?: string;
}

// @public
export interface KeyVaultCertificateWithPolicy extends KeyVaultCertificate {
    readonly policy?: CertificatePolicy;
}

// @public
export interface LifetimeAction {
    action?: CertificatePolicyAction;
    daysBeforeExpiry?: number;
    lifetimePercentage?: number;
}

// @public
export interface ListDeletedCertificatesOptions extends coreHttp.OperationOptions {
    includePending?: boolean;
    maxresults?: number;
}

// @public
export interface ListPropertiesOfCertificatesOptions extends coreHttp.OperationOptions {
    includePending?: boolean;
    maxresults?: number;
}

// @public
export interface ListPropertiesOfCertificateVersionsOptions extends coreHttp.OperationOptions {
    maxresults?: number;
}

// @public
export interface ListPropertiesOfIssuersOptions extends coreHttp.OperationOptions {
    maxresults?: number;
}

// @public
export const logger: import("@azure/logger").AzureLogger;

// @public
export interface MergeCertificateOptions extends coreHttp.OperationOptions {
}

export { PipelineOptions }

// @public
export interface PurgeDeletedCertificateOptions extends coreHttp.OperationOptions {
}

// @public
export type RequireAtLeastOne<T> = {
    [K in keyof T]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<keyof T, K>>>;
}[keyof T];

// @public
export interface RestoreCertificateBackupOptions extends coreHttp.OperationOptions {
}

// @public
export interface SetContactsOptions extends coreHttp.OperationOptions {
}

// @public
export type SubjectAlternativeNames = RequireAtLeastOne<SubjectAlternativeNamesAll>;

// @public
export interface SubjectAlternativeNamesAll {
    dnsNames: ArrayOneOrMore<string>;
    emails: ArrayOneOrMore<string>;
    userPrincipalNames: ArrayOneOrMore<string>;
}

// @public
export interface UpdateCertificateOptions extends CertificateProperties, coreHttp.OperationOptions {
}

// @public
export interface UpdateCertificatePolicyOptions extends CertificateProperties, coreHttp.OperationOptions {
}

// @public
export interface UpdateIssuerOptions extends CreateIssuerOptions {
    provider?: string;
}

// @public
export enum WellKnownIssuer {
    Self = "Self",
    Unknown = "Unknown"
}

// @public
export interface X509CertificateProperties {
    ekus?: string[];
    keyUsage?: KeyUsageType[];
    subject?: string;
    subjectAlternativeNames?: CoreSubjectAlternativeNames;
    validityInMonths?: number;
}


// (No @packageDocumentation comment for this package)

```