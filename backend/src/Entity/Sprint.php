<?php

namespace App\Entity;

use App\Repository\SprintRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: SprintRepository::class)]
class Sprint
{
    #[Groups(['Sprint'])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['Sprint'])]
    #[ORM\Column(length: 255)]
    private ?string $sprintName = null;

    #[Groups(['Sprint'])]
    #[ORM\Column(length: 255)]
    private ?string $priority = null;

    #[Groups(['Sprint'])]
    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTimeInterface $startDate = null;

    #[Groups(['Sprint'])]
    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTimeInterface $endDate = null;

    #[Groups(['Sprint'])]
    #[ORM\Column(length: 255)]
    private ?string $userStory = null;

    #[Groups(['Sprint'])]
    #[ORM\Column]
    private ?\DateTimeImmutable $createdAt = null;

    #[Groups(['Sprint'])]
    #[ORM\Column]
    private ?\DateTimeImmutable $updatedAt = null;

    #[Groups(['Sprint'])]
    #[ORM\ManyToOne(inversedBy: 'sprints')]
    #[ORM\JoinColumn(nullable: false)]
    private ?TestProject $project = null;

    #[Groups(['details_sprint'])]
    #[ORM\OneToMany(mappedBy: 'sprint', targetEntity: UseCase::class)]
    private Collection $useCases;

    public function __construct()
    {
        $this->useCases = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getSprintName(): ?string
    {
        return $this->sprintName;
    }

    public function setSprintName(string $sprintName): self
    {
        $this->sprintName = $sprintName;

        return $this;
    }

    public function getPriority(): ?string
    {
        return $this->priority;
    }

    public function setPriority(string $priority): self
    {
        $this->priority = $priority;

        return $this;
    }

    public function getStartDate(): ?\DateTimeInterface
    {
        return $this->startDate;
    }

    public function setStartDate(\DateTimeInterface $startDate): self
    {
        $this->startDate = $startDate;

        return $this;
    }

    public function getEndDate(): ?\DateTimeInterface
    {
        return $this->endDate;
    }

    public function setEndDate(\DateTimeInterface $endDate): self
    {
        $this->endDate = $endDate;

        return $this;
    }

    public function getUserStory(): ?string
    {
        return $this->userStory;
    }

    public function setUserStory(string $userStory): self
    {
        $this->userStory = $userStory;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeImmutable
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(\DateTimeImmutable $updatedAt): self
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    public function getProject(): ?TestProject
    {
        return $this->project;
    }

    public function setProject(?TestProject $project): self
    {
        $this->project = $project;

        return $this;
    }

    /**
     * @return Collection<int, UseCase>
     */
    public function getUseCases(): Collection
    {
        return $this->useCases;
    }

    public function addUseCase(UseCase $useCase): self
    {
        if (!$this->useCases->contains($useCase)) {
            $this->useCases->add($useCase);
            $useCase->setSprint($this);
        }

        return $this;
    }

    public function removeUseCase(UseCase $useCase): self
    {
        if ($this->useCases->removeElement($useCase)) {
            // set the owning side to null (unless already changed)
            if ($useCase->getSprint() === $this) {
                $useCase->setSprint(null);
            }
        }

        return $this;
    }
}
