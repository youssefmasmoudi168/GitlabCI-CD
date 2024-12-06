<?php

namespace App\Service ;


use App\Repository\SprintRepository ;
use App\Service\DeleteUseCase ;

class DeleteSprint 
{
    private $sprintRepository ;
    private $deleteUseCase ;

    public function __construct(SprintRepository $sprintRepository, DeleteUseCase $deleteUseCase)
    {
        $this->sprintRepository = $sprintRepository;
        $this->deleteUseCase = $deleteUseCase;
    }

    public function deleteSprintByTestProjectId($testProjectId)
    {
        $sprints = $this->sprintRepository->findBy(['project'=> $testProjectId]); 
        foreach ($sprints as $sprint) {
            $this->deleteUseCase->deleteTestCaseBySprintId($sprint->getId());
            $this->sprintRepository->remove($sprint);
        }
    }


}