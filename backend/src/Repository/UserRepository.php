<?php

namespace App\Repository;

use App\Entity\User;
use JsonException;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

/**
 * @extends ServiceEntityRepository<User>
 *
 * @method User|null find($id, $lockMode = null, $lockVersion = null)
 * @method User|null findOneBy(array $criteria, array $orderBy = null)
 * @method User[]    findAll()
 * @method User[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UserRepository extends ServiceEntityRepository
{
    private $validator;
    private $passwordHasher;
    public function __construct(ManagerRegistry $registry, ValidatorInterface $validator, UserPasswordHasherInterface $passwordHasher)
    {
        parent::__construct($registry, User::class);
        $this->validator = $validator;
        $this->passwordHasher = $passwordHasher;
    }

    public function save(User $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(User $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function resetAutoIncrement(): void
    {
        $this->getEntityManager()->
            getConnection()->
            executeQuery('ALTER TABLE user AUTO_INCREMENT = 1');
    }

    public function findByEmail(string $email): ?User
    {
        return $this->findOneBy(['email' => $email]);
    }
    public function create($user, bool $flush = false)
    {
        $newUser = new User();

        if (isset($user['firstName'])) {
            $newUser->setFirstName($user['firstName']);
        }
        if (isset($user['lastName'])) {
            $newUser->setLastName($user['lastName']);
        }
        if (isset($user['email'])) {
            $newUser->setEmail($user['email']);
        }
        if (isset($user['password'])) {
            $hashedPassword = $this->passwordHasher->
                hashPassword($newUser, $user['password']);
            $newUser->setPassword($hashedPassword);
        }
        $newUser->setCreatedAt(new \DatetimeImmutable());
        $newUser->setUpdatedAt(new \DatetimeImmutable());

        $errors = $this->validator->validate($newUser);

        if (count($errors) > 0) {
            $errorString = (string) $errors;
            throw new JsonException($errorString, 404, null);
        }

        $this->getEntityManager()->persist($newUser);

        if ($flush) {
            $this->getEntityManager()->flush();
        }

        return $newUser->getId();
    }

    public function update($user, bool $flush = false): void
    {
        $userToUpdate = $this->find($user['id']);

        if (isset($user['firstName'])) {
            $userToUpdate->setFirstName($user['firstName']);
        }
        if (isset($user['lastName'])) {
            $userToUpdate->setLastName($user['lastName']);
        }
        if (isset($user['email'])) {
            $userToUpdate->setEmail($user['email']);
        }
        if (isset($user['password'])) {
            $userToUpdate->setPassword($user['password']);
        }

        $errors = $this->validator->validate($userToUpdate);

        if (count($errors) > 0) {
            $errorString = (string) $errors;
            throw new JsonException($errorString, 404, null);
        }

        $this->getEntityManager()->persist($userToUpdate);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }


//    public function findOneBySomeField($value): ?User
//    {
//        return $this->createQueryBuilder('u')
//            ->andWhere('u.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}