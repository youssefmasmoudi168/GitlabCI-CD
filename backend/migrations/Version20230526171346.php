<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230526171346 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE ligne_rapport DROP FOREIGN KEY FK_21AD9EA51351003D');
        $this->addSql('ALTER TABLE ligne_rapport DROP FOREIGN KEY FK_21AD9EA51DFBCC46');
        $this->addSql('DROP TABLE ligne_rapport');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE ligne_rapport (id INT AUTO_INCREMENT NOT NULL, rapport_id INT NOT NULL, test_case_id INT NOT NULL, etat TINYINT(1) DEFAULT NULL, date DATETIME NOT NULL, INDEX IDX_21AD9EA51DFBCC46 (rapport_id), UNIQUE INDEX UNIQ_21AD9EA51351003D (test_case_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE ligne_rapport ADD CONSTRAINT FK_21AD9EA51351003D FOREIGN KEY (test_case_id) REFERENCES test_case (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('ALTER TABLE ligne_rapport ADD CONSTRAINT FK_21AD9EA51DFBCC46 FOREIGN KEY (rapport_id) REFERENCES rapport (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
    }
}
