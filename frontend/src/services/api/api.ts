import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IGenericResponse } from './types';
import { ExecutionInput } from 'src/models/Execution/ExecutionSchema';
import { RapportInput } from 'src/models/Rapports/RapportSchema';
import { ScenarioUpdateInput } from 'src/models/Scenarios/ScenarioUpdateSchema';
import { ScenarioInput } from 'src/models/Scenario/ScenarioSchema';
import { SprintUpdateInput } from 'src/models/Sprints/SprintUpdateSchema';
import { SprintInput } from 'src/models/Sprints/SprintSchema';
import { TestCaseUpdateInput } from 'src/models/TestCases/TestCaseUpdateSchema';
import { TestCaseInput } from 'src/models/TestCases/TestCaseSchema';
import { ProjectUpdateInput } from 'src/models/Projects/ProjectUpdateSchema';
import { ProjectInput } from 'src/models/Projects/ProjectSchema';
import { UseCaseUpdateInput } from 'src/models/UseCases/UseCaseUpdateSchema';
import { UseCaseInput } from 'src/models/UseCases/UseCaseSchema';

const API_URL = process.env.REACT_APP_API_URL;

export const api = createApi({
  reducerPath: 'Api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem('token');

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    }
  }),
  tagTypes: [
    'Executions',
    'Rapport',
    'Scenarios',
    'Sprints',
    'TestCases',
    'Projects',
    'UseCases'
  ],
  endpoints: (builder) => ({
    fetchAllExecutions: builder.query<any, void>({
      query() {
        return {
          url: 'execution/fetch',
          method: 'GET'
        };
      },
      providesTags: [
        'Executions',
        'Rapport',
        'Scenarios',
        'Sprints',
        'TestCases',
        'Projects',
        'UseCases'
      ]
    }),
    fetchExecutionById: builder.query<any, any>({
      query(id) {
        return {
          url: `execution/fetch/${id}`,
          method: 'GET'
        };
      }
    }),
    createExecution: builder.mutation<IGenericResponse, ExecutionInput>({
      query(body: any) {
        return {
          url: `execution/create`,
          method: 'POST',
          body
        };
      },
      invalidatesTags: [
        'Executions',
        'Rapport',
        'Scenarios',
        'Sprints',
        'TestCases',
        'Projects',
        'UseCases'
      ]
    }),
    fetchAllRapports: builder.query<any, void>({
      query() {
        return {
          url: 'rapport/fetch',
          method: 'GET'
        };
      },
      providesTags: [
        'Executions',
        'Rapport',
        'Scenarios',
        'Sprints',
        'TestCases',
        'Projects',
        'UseCases'
      ]
    }),
    fetchRapportById: builder.query<any, any>({
      query(id) {
        return {
          url: `rapport/fetch/${id}`,
          method: 'GET'
        };
      }
    }),
    createRapport: builder.mutation<IGenericResponse, RapportInput>({
      query(body: any) {
        return {
          url: `rapport/create`,
          method: 'POST',
          body
        };
      },
      invalidatesTags: [
        'Executions',
        'Rapport',
        'Scenarios',
        'Sprints',
        'TestCases',
        'Projects',
        'UseCases'
      ]
    }),
    fetchAllScenarios: builder.query<any, void>({
      query() {
        return {
          url: 'scenario/fetch',
          method: 'GET'
        };
      },
      providesTags: [
        'Executions',
        'Rapport',
        'Scenarios',
        'Sprints',
        'TestCases',
        'Projects',
        'UseCases'
      ]
    }),
    fetchScenarioById: builder.query<any, any>({
      query(id) {
        return {
          url: `scenario/fetch/${id}`,
          method: 'GET'
        };
      }
    }),
    createScenario: builder.mutation<IGenericResponse, ScenarioInput>({
      query(body: any) {
        return {
          url: `scenario/create`,
          method: 'POST',
          body
        };
      },
      invalidatesTags: [
        'Executions',
        'Rapport',
        'Scenarios',
        'Sprints',
        'TestCases',
        'Projects',
        'UseCases'
      ]
    }),
    updateScenarioById: builder.mutation<IGenericResponse, ScenarioUpdateInput>(
      {
        query(body) {
          return {
            url: `scenario/update/${body.id}`,
            method: 'PUT',
            body
          };
        },
        invalidatesTags: [
          'Executions',
          'Rapport',
          'Scenarios',
          'Sprints',
          'TestCases',
          'Projects',
          'UseCases'
        ]
      }
    ),
    deleteScenarioById: builder.mutation<any, any>({
      query(id) {
        return {
          url: `scenario/delete/${id}`,
          method: 'DELETE'
        };
      },
      invalidatesTags: [
        'Executions',
        'Rapport',
        'Scenarios',
        'Sprints',
        'TestCases',
        'Projects',
        'UseCases'
      ]
    }),
    deleteAllScenarios: builder.mutation<IGenericResponse, void>({
      query() {
        return {
          url: `scenario/delete`,
          method: 'DELETE'
        };
      }
    }),
    fetchAllSprints: builder.query<any, void>({
      query() {
        return {
          url: 'sprint/fetch',
          method: 'GET'
        };
      },
      providesTags: [
        'Executions',
        'Rapport',
        'Scenarios',
        'Sprints',
        'TestCases',
        'Projects',
        'UseCases'
      ]
    }),
    fetchAllSprintsByProjectId: builder.query<any, void>({
      query(projectId) {
        return {
          url: `sprint/project/${projectId}`,
          method: 'GET'
        };
      },
      providesTags: [
        'Executions',
        'Rapport',
        'Scenarios',
        'Sprints',
        'TestCases',
        'Projects',
        'UseCases'
      ]
    }),
    fetchSprintById: builder.query<any, any>({
      query(id) {
        return {
          url: `sprint/fetch/${id}`
        };
      },
      providesTags: [
        'Executions',
        'Rapport',
        'Scenarios',
        'Sprints',
        'TestCases',
        'Projects',
        'UseCases'
      ]
    }),
    createSprint: builder.mutation<IGenericResponse, SprintInput>({
      query(body) {
        return {
          url: `sprint/create`,
          method: 'POST',
          body
        };
      },
      invalidatesTags: [
        'Executions',
        'Rapport',
        'Scenarios',
        'Sprints',
        'TestCases',
        'Projects',
        'UseCases'
      ]
    }),
    updateSprintById: builder.mutation<IGenericResponse, SprintUpdateInput>({
      query(body) {
        return {
          url: `sprint/update/${body.id}`,
          method: 'PUT',
          body
        };
      },
      invalidatesTags: [
        'Executions',
        'Rapport',
        'Scenarios',
        'Sprints',
        'TestCases',
        'Projects',
        'UseCases'
      ]
    }),
    deleteSprintById: builder.mutation<any, any>({
      query(id) {
        return {
          url: `sprint/delete/${id}`,
          method: 'DELETE'
        };
      },
      invalidatesTags: [
        'Executions',
        'Rapport',
        'Scenarios',
        'Sprints',
        'TestCases',
        'Projects',
        'UseCases'
      ]
    }),
    deleteAllSprints: builder.mutation<IGenericResponse, void>({
      query() {
        return {
          url: `sprint/delete`,
          method: 'DELETE'
        };
      }
    }),
    fetchAllTestCases: builder.query<any, void>({
      query() {
        return {
          url: 'fetch',
          method: 'GET'
        };
      },
      providesTags: [
        'Executions',
        'Rapport',
        'Scenarios',
        'Sprints',
        'TestCases',
        'Projects',
        'UseCases'
      ]
    }),
    fetchAllTestCasesByUseCaseId: builder.query<any, void>({
      query(useCaseId) {
        return {
          url: `testcase/usecase/${useCaseId}`,
          method: 'GET'
        };
      },
      providesTags: [
        'Executions',
        'Rapport',
        'Scenarios',
        'Sprints',
        'TestCases',
        'Projects',
        'UseCases'
      ]
    }),
    fetchTestCaseById: builder.query<any, any>({
      query(id) {
        return {
          url: `testcase/fetch/${id}`
        };
      },
      providesTags: [
        'Executions',
        'Rapport',
        'Scenarios',
        'Sprints',
        'TestCases',
        'Projects',
        'UseCases'
      ]
    }),
    createTestCase: builder.mutation<IGenericResponse, TestCaseInput>({
      query(body) {
        return {
          url: `testcase/create`,
          method: 'POST',
          body
        };
      },
      invalidatesTags: [
        'Executions',
        'Rapport',
        'Scenarios',
        'Sprints',
        'TestCases',
        'Projects',
        'UseCases'
      ]
    }),
    updateTestCaseById: builder.mutation<IGenericResponse, TestCaseUpdateInput>(
      {
        query(body) {
          return {
            url: `testcase/update/${body.id}`,
            method: 'PUT',
            body
          };
        },
        invalidatesTags: [
          'Executions',
          'Rapport',
          'Scenarios',
          'Sprints',
          'TestCases',
          'Projects',
          'UseCases'
        ]
      }
    ),
    deleteTestCaseById: builder.mutation<any, any>({
      query(id) {
        return {
          url: `testcase/delete/${id}`,
          method: 'DELETE'
        };
      },
      invalidatesTags: [
        'Executions',
        'Rapport',
        'Scenarios',
        'Sprints',
        'TestCases',
        'Projects',
        'UseCases'
      ]
    }),
    deleteAllTestCases: builder.mutation<IGenericResponse, void>({
      query() {
        return {
          url: `testcase/delete`,
          method: 'DELETE'
        };
      }
    }),
    fetchAllTestProjects: builder.query<any, void>({
      query() {
        return {
          url: 'testProject/fetch',
          method: 'GET'
        };
      },
      providesTags: [
        'Executions',
        'Rapport',
        'Scenarios',
        'Sprints',
        'TestCases',
        'Projects',
        'UseCases'
      ]
    }),
    fetchAllTestProjectsByUserId: builder.query<any, void>({
      query(userId) {
        return {
          url: `testProject/user/${userId}`,
          method: 'GET'
        };
      },
      providesTags: [
        'Executions',
        'Rapport',
        'Scenarios',
        'Sprints',
        'TestCases',
        'Projects',
        'UseCases'
      ]
    }),

    fetchAllTestProjectsAffectedByUserId: builder.query<any, void>({
      query(projectId) {
        return {
          url: `testProject/users/fetch/${projectId}`,
          method: 'GET'
        };
      },
      providesTags: [
        'Executions',
        'Rapport',
        'Scenarios',
        'Sprints',
        'TestCases',
        'Projects',
        'UseCases'
      ]
    }),

    addUsersToAffectedInProjectId: builder.mutation<any, any>({
      query(body) {
        return {
          url: `testProject/users/add/${body.project_id}`,
          method: 'POST',
          body: body
        };
      },
      invalidatesTags: [
        'Executions',
        'Rapport',
        'Scenarios',
        'Sprints',
        'TestCases',
        'Projects',
        'UseCases'
      ]
    }),

    removeUsersFromAffectedInProjectId: builder.mutation<any, any>({
      query(body) {
        return {
          url: `testProject/users/remove/${body.project_id}`,
          method: 'PUT',
          body: body
        };
      },
      invalidatesTags: [
        'Executions',
        'Rapport',
        'Scenarios',
        'Sprints',
        'TestCases',
        'Projects',
        'UseCases'
      ]
    }),

    fetchTestProjectById: builder.query<any, any>({
      query(id) {
        return {
          url: `testProject/fetch/${id}`
        };
      },
      providesTags: [
        'Executions',
        'Rapport',
        'Scenarios',
        'Sprints',
        'TestCases',
        'Projects',
        'UseCases'
      ]
    }),
    createTestProject: builder.mutation<IGenericResponse, ProjectInput>({
      query(body) {
        return {
          url: `testProject/create`,
          method: 'POST',
          body
        };
      },
      invalidatesTags: [
        'Executions',
        'Rapport',
        'Scenarios',
        'Sprints',
        'TestCases',
        'Projects',
        'UseCases'
      ]
    }),
    updateTestProjectById: builder.mutation<
      IGenericResponse,
      ProjectUpdateInput
    >({
      query(body) {
        return {
          url: `testProject/update/${body.id}`,
          method: 'PUT',
          body
        };
      },
      invalidatesTags: [
        'Executions',
        'Rapport',
        'Scenarios',
        'Sprints',
        'TestCases',
        'Projects',
        'UseCases'
      ]
    }),
    deleteTestProjectById: builder.mutation<any, any>({
      query(id) {
        return {
          url: `testProject/delete/${id}`,
          method: 'DELETE'
        };
      },
      invalidatesTags: [
        'Executions',
        'Rapport',
        'Scenarios',
        'Sprints',
        'TestCases',
        'Projects',
        'UseCases'
      ]
    }),
    deleteAllTestProjects: builder.mutation<IGenericResponse, void>({
      query() {
        return {
          url: `testProject/delete`,
          method: 'DELETE'
        };
      }
    }),
    fetchAllUseCases: builder.query<any, void>({
      query() {
        return {
          url: 'usecase/fetch',
          method: 'GET'
        };
      },
      providesTags: [
        'Executions',
        'Rapport',
        'Scenarios',
        'Sprints',
        'TestCases',
        'Projects',
        'UseCases'
      ]
    }),
    fetchAllUseCasesBySprintId: builder.query<any, void>({
      query(sprintId) {
        return {
          url: `usecase/sprint/${sprintId}`,
          method: 'GET'
        };
      },
      providesTags: [
        'Executions',
        'Rapport',
        'Scenarios',
        'Sprints',
        'TestCases',
        'Projects',
        'UseCases'
      ]
    }),
    fetchUseCaseById: builder.query<any, any>({
      query(id) {
        return {
          url: `usecase/fetch/${id}`
        };
      },
      providesTags: [
        'Executions',
        'Rapport',
        'Scenarios',
        'Sprints',
        'TestCases',
        'Projects',
        'UseCases'
      ]
    }),
    fetchUseCaseByScenarioId: builder.query<any, any>({
      query(id) {
        return {
          url: `usecase/fetch/scenario/${id}`
        };
      },
      providesTags: [
        'Executions',
        'Rapport',
        'Scenarios',
        'Sprints',
        'TestCases',
        'Projects',
        'UseCases'
      ]
    }),
    createUseCase: builder.mutation<IGenericResponse, UseCaseInput>({
      query(body) {
        return {
          url: `usecase/create`,
          method: 'POST',
          body
        };
      },
      invalidatesTags: [
        'Executions',
        'Rapport',
        'Scenarios',
        'Sprints',
        'TestCases',
        'Projects',
        'UseCases'
      ]
    }),
    updateUseCaseById: builder.mutation<IGenericResponse, UseCaseUpdateInput>({
      query(body) {
        return {
          url: `usecase/update/${body.id}`,
          method: 'PUT',
          body
        };
      },
      invalidatesTags: [
        'Executions',
        'Rapport',
        'Scenarios',
        'Sprints',
        'TestCases',
        'Projects',
        'UseCases'
      ]
    }),
    deleteUseCaseById: builder.mutation<any, any>({
      query(id) {
        return {
          url: `usecase/delete/${id}`,
          method: 'DELETE'
        };
      },
      invalidatesTags: [
        'Executions',
        'Rapport',
        'Scenarios',
        'Sprints',
        'TestCases',
        'Projects',
        'UseCases'
      ]
    }),
    deleteAllUseCases: builder.mutation<IGenericResponse, void>({
      query() {
        return {
          url: `usecase/delete`,
          method: 'DELETE'
        };
      }
    })
  })
});

export const {
  useFetchAllExecutionsQuery,
  useCreateExecutionMutation,
  useFetchExecutionByIdQuery,
  useFetchAllScenariosQuery,
  useCreateScenarioMutation,
  useDeleteAllScenariosMutation,
  useDeleteScenarioByIdMutation,
  useFetchScenarioByIdQuery,
  useUpdateScenarioByIdMutation,
  useFetchAllRapportsQuery,
  useFetchRapportByIdQuery,
  useCreateRapportMutation,
  useFetchAllSprintsQuery,
  useFetchSprintByIdQuery,
  useCreateSprintMutation,
  useDeleteAllSprintsMutation,
  useDeleteSprintByIdMutation,
  useUpdateSprintByIdMutation,
  useFetchAllSprintsByProjectIdQuery,
  useCreateTestCaseMutation,
  useDeleteAllTestCasesMutation,
  useDeleteTestCaseByIdMutation,
  useFetchAllTestCasesQuery,
  useFetchTestCaseByIdQuery,
  useUpdateTestCaseByIdMutation,
  useFetchAllTestCasesByUseCaseIdQuery,
  useFetchAllTestProjectsQuery,
  useCreateTestProjectMutation,
  useDeleteAllTestProjectsMutation,
  useDeleteTestProjectByIdMutation,
  useFetchTestProjectByIdQuery,
  useFetchAllTestProjectsAffectedByUserIdQuery,
  useUpdateTestProjectByIdMutation,
  useAddUsersToAffectedInProjectIdMutation,
  useFetchAllTestProjectsByUserIdQuery,
  useRemoveUsersFromAffectedInProjectIdMutation,
  useFetchAllUseCasesQuery,
  useCreateUseCaseMutation,
  useFetchUseCaseByScenarioIdQuery,
  useDeleteAllUseCasesMutation,
  useDeleteUseCaseByIdMutation,
  useFetchUseCaseByIdQuery,
  useUpdateUseCaseByIdMutation,
  useFetchAllUseCasesBySprintIdQuery
} = api;
