<?php

namespace App\Entity;

use App\Repository\UseCaseRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: UseCaseRepository::class)]
class UseCase
{
    #[Groups(['useCase'])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['useCase'])]
    #[ORM\Column(length: 255)]
    private ?string $title = null;

    #[Groups(['useCase'])]
    #[ORM\Column(length: 255)]
    private ?string $prereq = null;

    #[Groups(['useCase'])]
    #[ORM\Column(length: 255)]
    private ?string $expectedResult = null;

    #[Groups(['useCase'])]
    #[ORM\Column]
    private ?\DateTimeImmutable $createdAt = null;

    #[Groups(['useCase'])]
    #[ORM\Column]
    private ?\DateTimeImmutable $updatedAt = null;

    #[Groups(['useCase'])]
    #[ORM\ManyToOne(inversedBy: 'useCases')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Sprint $sprint = null;

    #[Groups(['details_testCases'])]
    #[ORM\OneToMany(mappedBy: 'useCase', targetEntity: TestCase::class)]
    private Collection $testCases;

    #[ORM\ManyToOne(inversedBy: 'UseCase')]
    private ?Scenario $scenario = null;

    public function __construct()
    {
        $this->testCases = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
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

    public function getPrereq(): ?string
    {
        return $this->prereq;
    }

    public function setPrereq(string $prereq): self
    {
        $this->prereq = $prereq;

        return $this;
    }

    public function getExpectedResult(): ?string
    {
        return $this->expectedResult;
    }

    public function setExpectedResult(string $expectedResult): self
    {
        $this->expectedResult = $expectedResult;

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

    public function getSprint(): ?Sprint
    {
        return $this->sprint;
    }

    public function setSprint(?Sprint $sprint): self
    {
        $this->sprint = $sprint;

        return $this;
    }

    /**
     * @return Collection<int, TestCase>
     */
    public function getTestCases(): Collection
    {
        return $this->testCases;
    }

    public function addTestCase(TestCase $testCase): self
    {
        if (!$this->testCases->contains($testCase)) {
            $this->testCases->add($testCase);
            $testCase->setUseCase($this);
        }

        return $this;
    }

    public function removeTestCase(TestCase $testCase): self
    {
        if ($this->testCases->removeElement($testCase)) {
            // set the owning side to null (unless already changed)
            if ($testCase->getUseCase() === $this) {
                $testCase->setUseCase(null);
            }
        }

        return $this;
    }

    public function getScenario(): ?Scenario
    {
        return $this->scenario;
    }

    public function setScenario(?Scenario $scenario): self
    {
        $this->scenario = $scenario;

        return $this;
    }
}
