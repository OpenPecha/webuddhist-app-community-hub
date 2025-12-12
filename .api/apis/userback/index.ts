import type * as types from './types';
import type { ConfigOptions, FetchResponse } from 'api/dist/core'
import Oas from 'oas';
import APICore from 'api/dist/core';
import definition from './openapi.json';

class SDK {
  spec: Oas;
  core: APICore;

  constructor() {
    this.spec = Oas.init(definition);
    this.core = new APICore(this.spec, 'userback/1.0.0 (api/6.1.3)');
  }

  /**
   * Optionally configure various options that the SDK allows.
   *
   * @param config Object of supported SDK options and toggles.
   * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
   * should be represented in milliseconds.
   */
  config(config: ConfigOptions) {
    this.core.setConfig(config);
  }

  /**
   * If the API you're using requires authentication you can supply the required credentials
   * through this method and the library will magically determine how they should be used
   * within your API request.
   *
   * With the exception of OpenID and MutualTLS, it supports all forms of authentication
   * supported by the OpenAPI specification.
   *
   * @example <caption>HTTP Basic auth</caption>
   * sdk.auth('username', 'password');
   *
   * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
   * sdk.auth('myBearerToken');
   *
   * @example <caption>API Keys</caption>
   * sdk.auth('myApiKey');
   *
   * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
   * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
   * @param values Your auth credentials for the API; can specify up to two strings or numbers.
   */
  auth(...values: string[] | number[]) {
    this.core.setAuth(...values);
    return this;
  }

  /**
   * If the API you're using offers alternate server URLs, and server variables, you can tell
   * the SDK which one to use with this method. To use it you can supply either one of the
   * server URLs that are contained within the OpenAPI definition (along with any server
   * variables), or you can pass it a fully qualified URL to use (that may or may not exist
   * within the OpenAPI definition).
   *
   * @example <caption>Server URL with server variables</caption>
   * sdk.server('https://{region}.api.example.com/{basePath}', {
   *   name: 'eu',
   *   basePath: 'v14',
   * });
   *
   * @example <caption>Fully qualified server URL</caption>
   * sdk.server('https://eu.api.example.com/v14');
   *
   * @param url Server URL
   * @param variables An object of variables to replace into the server URL.
   */
  server(url: string, variables = {}) {
    this.core.setServer(url, variables);
  }

  /**
   * Retrieves a Feedback comment by Id
   *
   * @summary Get a comment
   * @throws FetchError<401, types.GetFeedbackCommentResponse401> Not Authorized
   * @throws FetchError<404, types.GetFeedbackCommentResponse404> Not Found
   * @throws FetchError<422, types.GetFeedbackCommentResponse422> Validation Error
   * @throws FetchError<429, types.GetFeedbackCommentResponse429> Too Many Requests
   * @throws FetchError<500, types.GetFeedbackCommentResponse500> Interal Server Error
   */
  getFeedbackComment(metadata: types.GetFeedbackCommentMetadataParam): Promise<FetchResponse<200, types.GetFeedbackCommentResponse200>> {
    return this.core.fetch('/feedback/comment/{id}', 'get', metadata);
  }

  /**
   * Updates feedback comment
   *
   * @summary Update a comment
   * @throws FetchError<401, types.UpdateFeedbackCommentResponse401> Not Authorized
   * @throws FetchError<404, types.UpdateFeedbackCommentResponse404> Not Found
   * @throws FetchError<422, types.UpdateFeedbackCommentResponse422> Validation Error
   * @throws FetchError<429, types.UpdateFeedbackCommentResponse429> Too Many Requests
   * @throws FetchError<500, types.UpdateFeedbackCommentResponse500> Interal Server Error
   */
  updateFeedbackComment(body: types.UpdateFeedbackCommentBodyParam, metadata: types.UpdateFeedbackCommentMetadataParam): Promise<FetchResponse<201, types.UpdateFeedbackCommentResponse201>> {
    return this.core.fetch('/feedback/comment/{id}', 'patch', body, metadata);
  }

  /**
   * Deletes a feedback comment
   *
   * @summary Delete a comment
   * @throws FetchError<401, types.DeleteFeedbackCommentResponse401> Not Authorized
   * @throws FetchError<404, types.DeleteFeedbackCommentResponse404> Not Found
   * @throws FetchError<422, types.DeleteFeedbackCommentResponse422> Validation Error
   * @throws FetchError<429, types.DeleteFeedbackCommentResponse429> Too Many Requests
   * @throws FetchError<500, types.DeleteFeedbackCommentResponse500> Interal Server Error
   */
  deleteFeedbackComment(metadata: types.DeleteFeedbackCommentMetadataParam): Promise<FetchResponse<202, types.DeleteFeedbackCommentResponse202>> {
    return this.core.fetch('/feedback/comment/{id}', 'delete', metadata);
  }

  /**
   * Lists available feedback comments
   *
   * @summary List comments from a feedback
   * @throws FetchError<401, types.ListFeedbackCommentsResponse401> Not Authorized
   * @throws FetchError<422, types.ListFeedbackCommentsResponse422> Validation Error
   * @throws FetchError<429, types.ListFeedbackCommentsResponse429> Too Many Requests
   * @throws FetchError<500, types.ListFeedbackCommentsResponse500> Interal Server Error
   */
  listFeedbackComments(metadata?: types.ListFeedbackCommentsMetadataParam): Promise<FetchResponse<200, types.ListFeedbackCommentsResponse200>> {
    return this.core.fetch('/feedback/comment', 'get', metadata);
  }

  /**
   * Creates a feedback comment
   *
   * @summary Comment on a feedback
   * @throws FetchError<401, types.CreateFeedbackCommentResponse401> Not Authorized
   * @throws FetchError<422, types.CreateFeedbackCommentResponse422> Validation Error
   * @throws FetchError<429, types.CreateFeedbackCommentResponse429> Too Many Requests
   * @throws FetchError<500, types.CreateFeedbackCommentResponse500> Interal Server Error
   */
  createFeedbackComment(body: types.CreateFeedbackCommentBodyParam): Promise<FetchResponse<201, types.CreateFeedbackCommentResponse201>> {
    return this.core.fetch('/feedback/comment', 'post', body);
  }

  /**
   * Create new FeedbackScreenshots
   *
   * @summary Create FeedbackScreenshots
   * @throws FetchError<401, types.CreateScreenshotResponse401> Not Authorized
   * @throws FetchError<412, types.CreateScreenshotResponse412> Precondition Failed
   * @throws FetchError<422, types.CreateScreenshotResponse422> Validation Error
   * @throws FetchError<429, types.CreateScreenshotResponse429> Too Many Requests
   * @throws FetchError<500, types.CreateScreenshotResponse500> Interal Server Error
   */
  createScreenshot(body: types.CreateScreenshotBodyParam): Promise<FetchResponse<201, types.CreateScreenshotResponse201>> {
    return this.core.fetch('/feedback/screenshot', 'post', body);
  }

  /**
   * Retrieves a feedback by Id
   *
   * @summary Get a feedback
   * @throws FetchError<401, types.GetFeedbackResponse401> Not Authorized
   * @throws FetchError<404, types.GetFeedbackResponse404> Not Found
   * @throws FetchError<422, types.GetFeedbackResponse422> Validation Error
   * @throws FetchError<429, types.GetFeedbackResponse429> Too Many Requests
   * @throws FetchError<500, types.GetFeedbackResponse500> Interal Server Error
   */
  getFeedback(metadata: types.GetFeedbackMetadataParam): Promise<FetchResponse<200, types.GetFeedbackResponse200>> {
    return this.core.fetch('/feedback/{id}', 'get', metadata);
  }

  /**
   * Updates feedback
   *
   * @summary Update a feedback
   * @throws FetchError<401, types.UpdateFeedbackResponse401> Not Authorized
   * @throws FetchError<404, types.UpdateFeedbackResponse404> Not Found
   * @throws FetchError<422, types.UpdateFeedbackResponse422> Validation Error
   * @throws FetchError<429, types.UpdateFeedbackResponse429> Too Many Requests
   * @throws FetchError<500, types.UpdateFeedbackResponse500> Interal Server Error
   */
  updateFeedback(body: types.UpdateFeedbackBodyParam, metadata: types.UpdateFeedbackMetadataParam): Promise<FetchResponse<201, types.UpdateFeedbackResponse201>> {
    return this.core.fetch('/feedback/{id}', 'patch', body, metadata);
  }

  /**
   * Deletes a feedback
   *
   * @summary Delete a feedback
   * @throws FetchError<401, types.DeleteFeedbackResponse401> Not Authorized
   * @throws FetchError<404, types.DeleteFeedbackResponse404> Not Found
   * @throws FetchError<422, types.DeleteFeedbackResponse422> Validation Error
   * @throws FetchError<429, types.DeleteFeedbackResponse429> Too Many Requests
   * @throws FetchError<500, types.DeleteFeedbackResponse500> Interal Server Error
   */
  deleteFeedback(metadata: types.DeleteFeedbackMetadataParam): Promise<FetchResponse<202, types.DeleteFeedbackResponse202>> {
    return this.core.fetch('/feedback/{id}', 'delete', metadata);
  }

  /**
   * Lists available feedbacks
   *
   * @summary List feedbacks
   * @throws FetchError<401, types.ListFeedbacksResponse401> Not Authorized
   * @throws FetchError<422, types.ListFeedbacksResponse422> Validation Error
   * @throws FetchError<429, types.ListFeedbacksResponse429> Too Many Requests
   * @throws FetchError<500, types.ListFeedbacksResponse500> Interal Server Error
   */
  listFeedbacks(metadata?: types.ListFeedbacksMetadataParam): Promise<FetchResponse<200, types.ListFeedbacksResponse200>> {
    return this.core.fetch('/feedback', 'get', metadata);
  }

  /**
   * Creates a feedback
   *
   * @summary Create a feedback
   * @throws FetchError<401, types.CreateFeedbackResponse401> Not Authorized
   * @throws FetchError<412, types.CreateFeedbackResponse412> Precondition Failed
   * @throws FetchError<422, types.CreateFeedbackResponse422> Validation Error
   * @throws FetchError<429, types.CreateFeedbackResponse429> Too Many Requests
   * @throws FetchError<500, types.CreateFeedbackResponse500> Interal Server Error
   */
  createFeedback(body: types.CreateFeedbackBodyParam): Promise<FetchResponse<201, types.CreateFeedbackResponse201>> {
    return this.core.fetch('/feedback', 'post', body);
  }

  /**
   * Retrieves a Member by Id
   *
   * @summary Retrieve a Member by Id
   * @throws FetchError<401, types.GetMemberResponse401> Not Authorized
   * @throws FetchError<404, types.GetMemberResponse404> Not Found
   * @throws FetchError<422, types.GetMemberResponse422> Validation Error
   * @throws FetchError<429, types.GetMemberResponse429> Too Many Requests
   * @throws FetchError<500, types.GetMemberResponse500> Interal Server Error
   */
  getMember(metadata: types.GetMemberMetadataParam): Promise<FetchResponse<200, types.GetMemberResponse200>> {
    return this.core.fetch('/member/{id}', 'get', metadata);
  }

  /**
   * Updates a Userback member
   *
   * @summary Update member information
   * @throws FetchError<401, types.UpdateMemberResponse401> Not Authorized
   * @throws FetchError<422, types.UpdateMemberResponse422> Validation Error
   * @throws FetchError<429, types.UpdateMemberResponse429> Too Many Requests
   * @throws FetchError<500, types.UpdateMemberResponse500> Interal Server Error
   */
  updateMember(body: types.UpdateMemberBodyParam, metadata: types.UpdateMemberMetadataParam): Promise<FetchResponse<201, types.UpdateMemberResponse201>> {
    return this.core.fetch('/member/{id}', 'patch', body, metadata);
  }

  /**
   * Lists available Members
   *
   * @summary List available members
   * @throws FetchError<401, types.ListMembersResponse401> Not Authorized
   * @throws FetchError<422, types.ListMembersResponse422> Validation Error
   * @throws FetchError<429, types.ListMembersResponse429> Too Many Requests
   * @throws FetchError<500, types.ListMembersResponse500> Interal Server Error
   */
  listMembers(metadata?: types.ListMembersMetadataParam): Promise<FetchResponse<200, types.ListMembersResponse200>> {
    return this.core.fetch('/member', 'get', metadata);
  }

  /**
   * Retrieves a project by Id
   *
   * @summary Retrieve a project by Id
   * @throws FetchError<401, types.GetProjectResponse401> Not Authorized
   * @throws FetchError<404, types.GetProjectResponse404> Not Found
   * @throws FetchError<422, types.GetProjectResponse422> Validation Error
   * @throws FetchError<429, types.GetProjectResponse429> Too Many Requests
   * @throws FetchError<500, types.GetProjectResponse500> Interal Server Error
   */
  getProject(metadata: types.GetProjectMetadataParam): Promise<FetchResponse<200, types.GetProjectResponse200>> {
    return this.core.fetch('/project/{id}', 'get', metadata);
  }

  /**
   * Updates a Userback project
   *
   * @summary Update project information
   * @throws FetchError<401, types.UpdateProjectResponse401> Not Authorized
   * @throws FetchError<422, types.UpdateProjectResponse422> Validation Error
   * @throws FetchError<429, types.UpdateProjectResponse429> Too Many Requests
   * @throws FetchError<500, types.UpdateProjectResponse500> Interal Server Error
   */
  updateProject(body: types.UpdateProjectBodyParam, metadata: types.UpdateProjectMetadataParam): Promise<FetchResponse<201, types.UpdateProjectResponse201>> {
    return this.core.fetch('/project/{id}', 'patch', body, metadata);
  }

  /**
   * Lists available projects
   *
   * @summary List available projects
   * @throws FetchError<401, types.ListProjectsResponse401> Not Authorized
   * @throws FetchError<422, types.ListProjectsResponse422> Validation Error
   * @throws FetchError<429, types.ListProjectsResponse429> Too Many Requests
   * @throws FetchError<500, types.ListProjectsResponse500> Interal Server Error
   */
  listProjects(metadata?: types.ListProjectsMetadataParam): Promise<FetchResponse<200, types.ListProjectsResponse200>> {
    return this.core.fetch('/project', 'get', metadata);
  }

  /**
   * Retrieves a SessionRecording by ID
   *
   * @summary Get a SessionRecording
   * @throws FetchError<401, types.GetSessionRecordingResponse401> Not Authorized
   * @throws FetchError<404, types.GetSessionRecordingResponse404> Not Found
   * @throws FetchError<422, types.GetSessionRecordingResponse422> Validation Error
   * @throws FetchError<429, types.GetSessionRecordingResponse429> Too Many Requests
   * @throws FetchError<500, types.GetSessionRecordingResponse500> Interal Server Error
   */
  getSessionRecording(metadata: types.GetSessionRecordingMetadataParam): Promise<FetchResponse<200, types.GetSessionRecordingResponse200>> {
    return this.core.fetch('/sessionRecording/{id}', 'get', metadata);
  }

  /**
   * Lists available SessionRecordings
   *
   * @summary List SessionRecordings
   * @throws FetchError<401, types.ListSessionRecordingsResponse401> Not Authorized
   * @throws FetchError<422, types.ListSessionRecordingsResponse422> Validation Error
   * @throws FetchError<429, types.ListSessionRecordingsResponse429> Too Many Requests
   * @throws FetchError<500, types.ListSessionRecordingsResponse500> Interal Server Error
   */
  listSessionRecordings(metadata?: types.ListSessionRecordingsMetadataParam): Promise<FetchResponse<200, types.ListSessionRecordingsResponse200>> {
    return this.core.fetch('/sessionRecording', 'get', metadata);
  }

  /**
   * List all workflows available
   *
   * @summary List workflows
   * @throws FetchError<401, types.ListWorkflowsResponse401> Not Authorized
   * @throws FetchError<422, types.ListWorkflowsResponse422> Validation Error
   * @throws FetchError<429, types.ListWorkflowsResponse429> Too Many Requests
   * @throws FetchError<500, types.ListWorkflowsResponse500> Interal Server Error
   */
  listWorkflows(metadata?: types.ListWorkflowsMetadataParam): Promise<FetchResponse<200, types.ListWorkflowsResponse200>> {
    return this.core.fetch('/workflow', 'get', metadata);
  }

  /**
   * Create a new workflow
   *
   * @summary Create a workflow
   * @throws FetchError<401, types.CreateWorkflowResponse401> Not Authorized
   * @throws FetchError<422, types.CreateWorkflowResponse422> Validation Error
   * @throws FetchError<429, types.CreateWorkflowResponse429> Too Many Requests
   * @throws FetchError<500, types.CreateWorkflowResponse500> Interal Server Error
   */
  createWorkflow(body: types.CreateWorkflowBodyParam): Promise<FetchResponse<201, types.CreateWorkflowResponse201>> {
    return this.core.fetch('/workflow', 'post', body);
  }

  /**
   * Update a workflow
   *
   * @summary Update a workflow
   * @throws FetchError<401, types.UpdateWorkflowResponse401> Not Authorized
   * @throws FetchError<404, types.UpdateWorkflowResponse404> Not Found
   * @throws FetchError<422, types.UpdateWorkflowResponse422> Validation Error
   * @throws FetchError<429, types.UpdateWorkflowResponse429> Too Many Requests
   * @throws FetchError<500, types.UpdateWorkflowResponse500> Interal Server Error
   */
  updateWorkflow(body: types.UpdateWorkflowBodyParam, metadata: types.UpdateWorkflowMetadataParam): Promise<FetchResponse<201, types.UpdateWorkflowResponse201>> {
    return this.core.fetch('/workflow/{id}', 'patch', body, metadata);
  }

  /**
   * Delete a workflow
   *
   * @summary Delete a workflow
   * @throws FetchError<401, types.DeleteWorkflowResponse401> Not Authorized
   * @throws FetchError<404, types.DeleteWorkflowResponse404> Not Found
   * @throws FetchError<422, types.DeleteWorkflowResponse422> Validation Error
   * @throws FetchError<429, types.DeleteWorkflowResponse429> Too Many Requests
   * @throws FetchError<500, types.DeleteWorkflowResponse500> Interal Server Error
   */
  deleteWorkflow(metadata: types.DeleteWorkflowMetadataParam): Promise<FetchResponse<202, types.DeleteWorkflowResponse202>> {
    return this.core.fetch('/workflow/{id}', 'delete', metadata);
  }
}

const createSDK = (() => { return new SDK(); })()
;

export default createSDK;

export type { CreateFeedbackBodyParam, CreateFeedbackCommentBodyParam, CreateFeedbackCommentResponse201, CreateFeedbackCommentResponse401, CreateFeedbackCommentResponse422, CreateFeedbackCommentResponse429, CreateFeedbackCommentResponse500, CreateFeedbackResponse201, CreateFeedbackResponse401, CreateFeedbackResponse412, CreateFeedbackResponse422, CreateFeedbackResponse429, CreateFeedbackResponse500, CreateScreenshotBodyParam, CreateScreenshotResponse201, CreateScreenshotResponse401, CreateScreenshotResponse412, CreateScreenshotResponse422, CreateScreenshotResponse429, CreateScreenshotResponse500, CreateWorkflowBodyParam, CreateWorkflowResponse201, CreateWorkflowResponse401, CreateWorkflowResponse422, CreateWorkflowResponse429, CreateWorkflowResponse500, DeleteFeedbackCommentMetadataParam, DeleteFeedbackCommentResponse202, DeleteFeedbackCommentResponse401, DeleteFeedbackCommentResponse404, DeleteFeedbackCommentResponse422, DeleteFeedbackCommentResponse429, DeleteFeedbackCommentResponse500, DeleteFeedbackMetadataParam, DeleteFeedbackResponse202, DeleteFeedbackResponse401, DeleteFeedbackResponse404, DeleteFeedbackResponse422, DeleteFeedbackResponse429, DeleteFeedbackResponse500, DeleteWorkflowMetadataParam, DeleteWorkflowResponse202, DeleteWorkflowResponse401, DeleteWorkflowResponse404, DeleteWorkflowResponse422, DeleteWorkflowResponse429, DeleteWorkflowResponse500, GetFeedbackCommentMetadataParam, GetFeedbackCommentResponse200, GetFeedbackCommentResponse401, GetFeedbackCommentResponse404, GetFeedbackCommentResponse422, GetFeedbackCommentResponse429, GetFeedbackCommentResponse500, GetFeedbackMetadataParam, GetFeedbackResponse200, GetFeedbackResponse401, GetFeedbackResponse404, GetFeedbackResponse422, GetFeedbackResponse429, GetFeedbackResponse500, GetMemberMetadataParam, GetMemberResponse200, GetMemberResponse401, GetMemberResponse404, GetMemberResponse422, GetMemberResponse429, GetMemberResponse500, GetProjectMetadataParam, GetProjectResponse200, GetProjectResponse401, GetProjectResponse404, GetProjectResponse422, GetProjectResponse429, GetProjectResponse500, GetSessionRecordingMetadataParam, GetSessionRecordingResponse200, GetSessionRecordingResponse401, GetSessionRecordingResponse404, GetSessionRecordingResponse422, GetSessionRecordingResponse429, GetSessionRecordingResponse500, ListFeedbackCommentsMetadataParam, ListFeedbackCommentsResponse200, ListFeedbackCommentsResponse401, ListFeedbackCommentsResponse422, ListFeedbackCommentsResponse429, ListFeedbackCommentsResponse500, ListFeedbacksMetadataParam, ListFeedbacksResponse200, ListFeedbacksResponse401, ListFeedbacksResponse422, ListFeedbacksResponse429, ListFeedbacksResponse500, ListMembersMetadataParam, ListMembersResponse200, ListMembersResponse401, ListMembersResponse422, ListMembersResponse429, ListMembersResponse500, ListProjectsMetadataParam, ListProjectsResponse200, ListProjectsResponse401, ListProjectsResponse422, ListProjectsResponse429, ListProjectsResponse500, ListSessionRecordingsMetadataParam, ListSessionRecordingsResponse200, ListSessionRecordingsResponse401, ListSessionRecordingsResponse422, ListSessionRecordingsResponse429, ListSessionRecordingsResponse500, ListWorkflowsMetadataParam, ListWorkflowsResponse200, ListWorkflowsResponse401, ListWorkflowsResponse422, ListWorkflowsResponse429, ListWorkflowsResponse500, UpdateFeedbackBodyParam, UpdateFeedbackCommentBodyParam, UpdateFeedbackCommentMetadataParam, UpdateFeedbackCommentResponse201, UpdateFeedbackCommentResponse401, UpdateFeedbackCommentResponse404, UpdateFeedbackCommentResponse422, UpdateFeedbackCommentResponse429, UpdateFeedbackCommentResponse500, UpdateFeedbackMetadataParam, UpdateFeedbackResponse201, UpdateFeedbackResponse401, UpdateFeedbackResponse404, UpdateFeedbackResponse422, UpdateFeedbackResponse429, UpdateFeedbackResponse500, UpdateMemberBodyParam, UpdateMemberMetadataParam, UpdateMemberResponse201, UpdateMemberResponse401, UpdateMemberResponse422, UpdateMemberResponse429, UpdateMemberResponse500, UpdateProjectBodyParam, UpdateProjectMetadataParam, UpdateProjectResponse201, UpdateProjectResponse401, UpdateProjectResponse422, UpdateProjectResponse429, UpdateProjectResponse500, UpdateWorkflowBodyParam, UpdateWorkflowMetadataParam, UpdateWorkflowResponse201, UpdateWorkflowResponse401, UpdateWorkflowResponse404, UpdateWorkflowResponse422, UpdateWorkflowResponse429, UpdateWorkflowResponse500 } from './types';
