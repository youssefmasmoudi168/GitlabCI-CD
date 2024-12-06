<?php

namespace App\Controller;

use App\Entity\TestCase;
use App\Repository\TestCaseRepository;
use App\Repository\ExecutionRepository;
use App\Repository\UseCaseRepository;
use App\Service\DeleteExecCampaign;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\Serializer\SerializerInterface;

class TestCaseController extends AbstractController
{
    #[Route('/api/testcase/fetch', name: 'api_testcase_fetch', methods: ['GET'])]
    public function fetch(TestCaseRepository $testCaseRepository): Response
    {
        return $this->json(
            $testCaseRepository->findAll(),
        );
    }


    #[Route('/api/testcase/usecase/{use_case_id}', name: 'api_sprint_fetch_by_use_case_id', methods: ['GET'])]
    public function fetchByUseCaseId($use_case_id, UseCaseRepository $useCaseRepository, SerializerInterface $serializer): JsonResponse
    {
        $use_case = $useCaseRepository->findOneBy(['id' => $use_case_id]);
        $test_cases = $use_case->getTestCases();
        $json = $serializer->serialize(
            $test_cases,
            JsonEncoder::FORMAT,

        );
        return new JsonResponse($json, 200, ['application/json'], true);
    }
    #[Route('/api/testcase/fetch/{id}', name: 'api_testcase_fetch_by_id', methods: ['GET'])]
    public function fetchById(TestCaseRepository $testCaseRepository, $id): Response
    {
        return $this->json([
            'testCase' => $testCaseRepository->findOneBy(['id' => $id]),
        ]);
    }

    #[Route('/api/testcase/create', name: 'api_testcase_create', methods: ['POST'])]
    public function create(Request $request, UseCaseRepository $useCaseRepository, TestCaseRepository $testCaseRepository, Security $security): Response
    {
        if($security->getUser()->getRoles()[0] == 'ROLE_VISITOR'){
            return $this->json('user unauthorized',401);
        } 
        $testCase = new TestCase();
        $data = $request->toArray();
        $useCase = $useCaseRepository->findOneBy(['id' => $data['useCaseId']]);
        $testCase->setTestCaseName($data['name']);
        $testCase->setSummary($data['summary']);
        $testCase->setTitle($data['title']);
        $testCase->setActor($data['actor']);
        $testCase->setPreCondition($data['precondition']);
        $testCase->setCreatedAt(new \DatetimeImmutable());
        $testCase->setUpdatedAt(new \DatetimeImmutable());
        $testCase->setUseCase($useCase);
        $testCaseRepository->save($testCase, true);

        return $this->json([
            'testCase' => $testCase,
        ]);

    }

    #[Route('/api/testcase/update/{id}', name: 'app_testcase_show', methods: ['PUT'])]
    public function updateById(Request $request, TestCaseRepository $testCaseRepository, $id, Security $security): Response
    {
        if($security->getUser()->getRoles()[0] == 'ROLE_VISITOR'){
            return $this->json('user unauthorized',401);
        } 

        $data = $request->toArray();
        $testCase = $testCaseRepository->findOneBy(['id' => $id]);

        $testCase->setTestCaseName($data['name']);
        $testCase->setSummary($data['summary']);
        $testCase->setTitle($data['title']);
        $testCase->setActor($data['actor']);
        $testCase->setPreCondition($data['precondition']);
        $testCase->setCreatedAt(new \DatetimeImmutable());
        $testCase->setUpdatedAt(new \DatetimeImmutable());

        $testCaseRepository->save($testCase, true);

        return $this->json([
            'testCase' => $testCase,
        ]);
    }

    #[Route('/api/testcase/delete/{id}', name: 'api_testcase_delete_by_id', methods: ['DELETE'])]
    public function deleteById(Request $request, TestCaseRepository $testCaseRepository,ExecutionRepository $executionrepository, $id, Security $security): Response
    {
        if($security->getUser()->getRoles()[0] == 'ROLE_VISITOR'){
            return $this->json('user unauthorized',401);
        } 
        $testCase = $testCaseRepository->findOneBy(['id' => $id]);
        $execution = $executionrepository->findBy(['testCase' => $id]);
        // dd($execution);
        if($execution){
            foreach($execution as $exec){
                $executionrepository->remove($exec, true);
            }
        }
        $testCaseRepository->remove($testCase, true);

        return $this->json([
            'message' => 'testcase ' . $id . ' was deleted',
        ]);
    }

    #[Route('/api/testcase/delete', name: 'api_testcase_delete', methods: ['DELETE'])]
    public function delete(Request $request, TestCaseRepository $testCaseRepository, Security $security): Response
    {
        if($security->getUser()->getRoles()[0] == 'ROLE_VISITOR'){
            return $this->json('user unauthorized',401);
        } 

        $testCases = $testCaseRepository->findAll();

        foreach ($testCases as $testCase) {
            $testCaseRepository->remove($testCase, true);
        }

        $testCaseRepository->resetAutoIncrement();

        return $this->json([
            'message' => 'All testcases were deleted',
        ]);
    }
}