import { TenantProfileEntity } from "@/features/feature_tenant_profiles/domain/entities/tenant_profile_entity";
import { boolean, number, string } from "yup";
import { Array } from "effect/Schema";

export class TenantProfileModel implements TenantProfileEntity {
  constructor(
    public createdTime: number,
    public description: string,
    public id: { id: string; entityType: string },
    public isolatedTbRuleEngine: boolean,
    public name: string,
    public profileData: {
      configuration: {
        type: string;
        maxDevices: number;
        maxAssets: number;
        maxCustomers: number;
        maxUsers: number;
        maxDashboards: number;
        maxRuleChains: number;
        maxEdges: number;
        maxResourcesInBytes: number;
        maxOtaPackagesInBytes: number;
        maxResourceSize: number;
        transportTenantMsgRateLimit: string;
        transportTenantTelemetryMsgRateLimit: string;
        transportTenantTelemetryDataPointsRateLimit: string;
        transportDeviceMsgRateLimit: string;
        transportDeviceTelemetryMsgRateLimit: string;
        transportDeviceTelemetryDataPointsRateLimit: string;
        transportGatewayMsgRateLimit: string;
        transportGatewayTelemetryMsgRateLimit: string;
        transportGatewayTelemetryDataPointsRateLimit: string;
        transportGatewayDeviceMsgRateLimit: string;
        transportGatewayDeviceTelemetryMsgRateLimit: string;
        transportGatewayDeviceTelemetryDataPointsRateLimit: string;
        tenantEntityExportRateLimit: string;
        tenantEntityImportRateLimit: string;
        tenantNotificationRequestsRateLimit: string;
        tenantNotificationRequestsPerRuleRateLimit: string;
        maxTransportMessages: number;
        maxTransportDataPoints: number;
        maxREExecutions: number;
        maxJSExecutions: number;
        maxTbelExecutions: number;
        maxDPStorageDays: number;
        maxRuleNodeExecutionsPerMessage: number;
        maxDebugModeDurationMinutes: number;
        maxEmails: number;
        smsEnabled: boolean;
        maxSms: number;
        maxCreatedAlarms: number;
        tenantServerRestLimitsConfiguration: string;
        customerServerRestLimitsConfiguration: string;
        maxWsSessionsPerTenant: number;
        maxWsSessionsPerCustomer: number;
        maxWsSessionsPerRegularUser: number;
        maxWsSessionsPerPublicUser: number;
        wsMsgQueueLimitPerSession: number;
        maxWsSubscriptionsPerTenant: number;
        maxWsSubscriptionsPerCustomer: number;
        maxWsSubscriptionsPerRegularUser: number;
        maxWsSubscriptionsPerPublicUser: number;
        wsUpdatesPerSessionRateLimit: string;
        cassandraReadQueryTenantCoreRateLimits: string;
        cassandraWriteQueryTenantCoreRateLimits: string;
        cassandraReadQueryTenantRuleEngineRateLimits: string;
        cassandraWriteQueryTenantRuleEngineRateLimits: string;
        edgeEventRateLimits: string;
        edgeEventRateLimitsPerEdge: string;
        edgeUplinkMessagesRateLimits: string;
        edgeUplinkMessagesRateLimitsPerEdge: string;
        defaultStorageTtlDays: number;
        alarmsTtlDays: number;
        rpcTtlDays: number;
        queueStatsTtlDays: number;
        ruleEngineExceptionsTtlDays: number;
        warnThreshold: number;
        maxCalculatedFieldsPerEntity: number;
        maxArgumentsPerCF: number;
        maxDataPointsPerRollingArg: number;
        maxStateSizeInKBytes: number;
        maxSingleValueArgumentSizeInKBytes: number;
      };
      queueConfiguration: Array<{
        name: string;
        topic: string;
        pollInterval: number;
        partitions: number;
        consumerPerPartition: boolean;
        packProcessingTimeout: number;
        submitStrategy: { type: string; batchSize: number };
        processingStrategy: {
          type: string;
          retries: number;
          failurePercentage: number;
          pauseBetweenRetries: number;
          maxPauseBetweenRetries: number;
        };
        additionalInfo: null;
      }>;
    }
  ) {}

  static fromJson(json: TenantProfileModel): TenantProfileModel {
      return new TenantProfileModel(
          json.createdTime,
          json.description,
          json.id,
          json.isolatedTbRuleEngine,
          json.name,
          json.profileData,
      );
  }
}
