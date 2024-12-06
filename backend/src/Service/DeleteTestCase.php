<?php

namespace App\Service ;


use App\Repository\TestCaseRepository ;
use App\Service\DeleteExecution ;

class DeleteTestCase 
{
    private $testCaseRepository ;
    private $deleteTestCase ;

    public function __construct(TestCaseRepository $testCaseRepository, DeleteExecution $deleteExecution)
    {
        $this->testCaseRepository = $testCaseRepository;
        $this->deleteExecution = $deleteExecution;
    }

    public function deleteTestCaseByUseCaseId($useCaseId)
    {
        $testCases = $this->testCaseRepository->findBy(['useCase'=> $useCaseId]); 
        foreach ($testCases as $testCase) {
            $this->deleteExecution->deleteExecutionByTestCaseId($testCase->getId());
            $this->testCaseRepository->remove($testCase);
        }
    }


}