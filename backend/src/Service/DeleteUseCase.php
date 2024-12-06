<?php

namespace App\Service ;


use App\Repository\UseCaseRepository ;
use App\Service\DeleteTestCase ;

class DeleteUseCase 
{
    private $useCaseRepository ;
    private $deleteTestCase ;

    public function __construct(UseCaseRepository $useCaseRepository, DeleteTestCase $deleteTestCase)
    {
        $this->useCaseRepository = $useCaseRepository;
        $this->deleteTestCase = $deleteTestCase;
    }

    public function deleteTestCaseBySprintId($sprintId)
    {
        $useCases = $this->useCaseRepository->findBy(['sprint'=> $sprintId]); 
        foreach ($useCases as $useCase) {
            $this->deleteTestCase->deleteTestCaseByUseCaseId($useCase->getId());
            $this->useCaseRepository->remove($useCase);
        }
    }

    public function deleteTestCaseByScenarioId($scenarioId)
    {
        $useCases = $this->useCaseRepository->findBy(['scenario'=> $scenarioId]);
        foreach ($useCases as $useCase) {
            $this->deleteTestCase->deleteTestCaseByUseCaseId($useCase->getId());
            $this->useCaseRepository->remove($useCase);
        }
    }


}