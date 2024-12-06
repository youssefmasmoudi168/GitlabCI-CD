<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230526170320 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE execution ADD test_case_id INT NOT NULL');
        $this->addSql('ALTER TABLE execution ADD CONSTRAINT FK_2A0D73A1351003D FOREIGN KEY (test_case_id) REFERENCES test_case (id)');
        $this->addSql('CREATE INDEX IDX_2A0D73A1351003D ON execution (test_case_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE execution DROP FOREIGN KEY FK_2A0D73A1351003D');
        $this->addSql('DROP INDEX IDX_2A0D73A1351003D ON execution');
        $this->addSql('ALTER TABLE execution DROP test_case_id');
    }
}
