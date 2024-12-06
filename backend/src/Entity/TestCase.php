<?php

namespace App\Entity;

use App\Repository\TestCaseRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: TestCaseRepository::class)]
class TestCase
{
    #[Groups(['testCase'])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['testCase'])]
    #[ORM\Column(length: 255)]
    private ?string $testCaseName = null;

    #[Groups(['testCase'])]
    #[ORM\Column(length: 255)]
    private ?string $summary = null;

    #[Groups(['testCase'])]
    #[ORM\Column(length: 255)]
    private ?string $title = null;

    #[Groups(['testCase'])]
    #[ORM\Column(length: 255)]
    private ?string $actor = null;

    #[Groups(['testCase'])]
    #[ORM\Column(length: 255)]
    private ?string $preCondition = null;

    #[Groups(['testCase'])]
    #[ORM\Column]
    private ?\DateTimeImmutable $createdAt = null;

    #[Groups(['testCase'])]
    #[ORM\Column]
    private ?\DateTimeImmutable $updatedAt = null;

    #[Groups(['testCase'])]
    #[ORM\ManyToOne(inversedBy: 'testCases')]
    #[ORM\JoinColumn(nullable: false)]
    private ?UseCase $useCase = null;

    #[ORM\OneToMany(mappedBy: 'testCase', targetEntity: Execution::class)]
    private Collection $execution;


    public function __construct()
    {
        $this->execution = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTestCaseName(): ?string
    {
        return $this->testCaseName;
    }

    public function setTestCaseName(string $testCaseName): self
    {
        $this->testCaseName = $testCaseName;

        return $this;
    }

    public function getSummary(): ?string
    {
        return $this->summary;
    }

    public function setSummary(string $summary): self
    {
        $this->summary = $summary;

        return $this;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getActor(): ?string
    {
        return $this->actor;
    }

    public function setActor(string $actor): self
    {
        $this->actor = $actor;

        return $this;
    }

    public function getPreCondition(): ?string
    {
        return $this->preCondition;
    }

    public function setPreCondition(string $preCondition): self
    {
        $this->preCondition = $preCondition;

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

    public function getUseCase(): ?UseCase
    {
        return $this->useCase;
    }

    public function setUseCase(?UseCase $useCase): self
    {
        $this->useCase = $useCase;

        return $this;
    }

    /**
     * @return Collection<int, Execution>
     */
    public function getExecution(): Collection
    {
        return $this->execution;
    }

    public function addExecution(Execution $execution): self
    {
        if (!$this->execution->contains($execution)) {
            $this->execution->add($execution);
            $execution->setTestCase($this);
        }

        return $this;
    }

    public function removeExecution(Execution $execution): self
    {
        if ($this->execution->removeElement($execution)) {
            // set the owning side to null (unless already changed)
            if ($execution->getTestCase() === $this) {
                $execution->setTestCase(null);
            }
        }

        return $this;
    }


}