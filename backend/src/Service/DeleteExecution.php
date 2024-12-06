<?php

namespace App\Service ;


use App\Repository\ExecutionRepository ;


class DeleteExecution 
{
    private $executionRepository ;

    public function __construct(ExecutionRepository $executionRepository)
    {
        $this->executionRepository = $executionRepository;
    }

    public function deleteExecutionByTestCaseId($testCaseId)
    {
        $executions = $this->executionRepository->findBy(['testCase'=> $testCaseId]); 
        foreach ($executions as $execution) {
            
            $this->executionRepository->remove($execution);
        }
    }


}