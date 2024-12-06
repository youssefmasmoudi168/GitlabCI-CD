<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230514102206 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE affectation (id INT AUTO_INCREMENT NOT NULL, responsable_id INT NOT NULL, date DATETIME NOT NULL, INDEX IDX_F4DD61D353C59D72 (responsable_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE affectation_user (affectation_id INT NOT NULL, user_id INT NOT NULL, INDEX IDX_68F8B1676D0ABA22 (affectation_id), INDEX IDX_68F8B167A76ED395 (user_id), PRIMARY KEY(affectation_id, user_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE affectation_test_project (affectation_id INT NOT NULL, test_project_id INT NOT NULL, INDEX IDX_D318B11F6D0ABA22 (affectation_id), INDEX IDX_D318B11F6D5EA9A5 (test_project_id), PRIMARY KEY(affectation_id, test_project_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE execution (id INT AUTO_INCREMENT NOT NULL, scenario_id INT NOT NULL, rapport_id INT DEFAULT NULL, date_execution DATETIME NOT NULL, support VARCHAR(255) DEFAULT NULL, etat TINYINT(1) NOT NULL, INDEX IDX_2A0D73AE04E49DF (scenario_id), INDEX IDX_2A0D73A1DFBCC46 (rapport_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE ligne_rapport (id INT AUTO_INCREMENT NOT NULL, rapport_id INT NOT NULL, test_case_id INT NOT NULL, etat TINYINT(1) DEFAULT NULL, date DATETIME NOT NULL, INDEX IDX_21AD9EA51DFBCC46 (rapport_id), UNIQUE INDEX UNIQ_21AD9EA51351003D (test_case_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE rapport (id INT AUTO_INCREMENT NOT NULL, date DATETIME NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE refresh_token (id INT AUTO_INCREMENT NOT NULL, refresh_token VARCHAR(128) NOT NULL, username VARCHAR(255) NOT NULL, valid DATETIME NOT NULL, UNIQUE INDEX UNIQ_C74F2195C74F2195 (refresh_token), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE scenario (id INT AUTO_INCREMENT NOT NULL, designation VARCHAR(255) NOT NULL, description LONGTEXT DEFAULT NULL, date DATETIME NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE sprint (id INT AUTO_INCREMENT NOT NULL, project_id INT NOT NULL, sprint_name VARCHAR(255) NOT NULL, priority VARCHAR(255) NOT NULL, start_date DATE NOT NULL, end_date DATE NOT NULL, user_story VARCHAR(255) NOT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', updated_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', INDEX IDX_EF8055B7166D1F9C (project_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE test_case (id INT AUTO_INCREMENT NOT NULL, use_case_id INT NOT NULL, test_case_name VARCHAR(255) NOT NULL, summary VARCHAR(255) NOT NULL, title VARCHAR(255) NOT NULL, actor VARCHAR(255) NOT NULL, pre_condition VARCHAR(255) NOT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', updated_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', INDEX IDX_7D71B3CB31025FCC (use_case_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE test_project (id INT AUTO_INCREMENT NOT NULL, project_name VARCHAR(255) NOT NULL, creation_date DATE NOT NULL, author VARCHAR(255) NOT NULL, client VARCHAR(255) NOT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', updated_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE use_case (id INT AUTO_INCREMENT NOT NULL, sprint_id INT NOT NULL, scenario_id INT DEFAULT NULL, title VARCHAR(255) NOT NULL, prereq VARCHAR(255) NOT NULL, expected_result VARCHAR(255) NOT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', updated_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', INDEX IDX_E7240AC08C24077B (sprint_id), INDEX IDX_E7240AC0E04E49DF (scenario_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, first_name VARCHAR(255) NOT NULL, last_name VARCHAR(255) NOT NULL, roles JSON NOT NULL, is_verified TINYINT(1) NOT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', updated_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', is_active TINYINT(1) NOT NULL, UNIQUE INDEX UNIQ_8D93D649E7927C74 (email), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE messenger_messages (id BIGINT AUTO_INCREMENT NOT NULL, body LONGTEXT NOT NULL, headers LONGTEXT NOT NULL, queue_name VARCHAR(190) NOT NULL, created_at DATETIME NOT NULL, available_at DATETIME NOT NULL, delivered_at DATETIME DEFAULT NULL, INDEX IDX_75EA56E0FB7336F0 (queue_name), INDEX IDX_75EA56E0E3BD61CE (available_at), INDEX IDX_75EA56E016BA31DB (delivered_at), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE affectation ADD CONSTRAINT FK_F4DD61D353C59D72 FOREIGN KEY (responsable_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE affectation_user ADD CONSTRAINT FK_68F8B1676D0ABA22 FOREIGN KEY (affectation_id) REFERENCES affectation (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE affectation_user ADD CONSTRAINT FK_68F8B167A76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE affectation_test_project ADD CONSTRAINT FK_D318B11F6D0ABA22 FOREIGN KEY (affectation_id) REFERENCES affectation (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE affectation_test_project ADD CONSTRAINT FK_D318B11F6D5EA9A5 FOREIGN KEY (test_project_id) REFERENCES test_project (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE execution ADD CONSTRAINT FK_2A0D73AE04E49DF FOREIGN KEY (scenario_id) REFERENCES scenario (id)');
        $this->addSql('ALTER TABLE execution ADD CONSTRAINT FK_2A0D73A1DFBCC46 FOREIGN KEY (rapport_id) REFERENCES rapport (id)');
        $this->addSql('ALTER TABLE ligne_rapport ADD CONSTRAINT FK_21AD9EA51DFBCC46 FOREIGN KEY (rapport_id) REFERENCES rapport (id)');
        $this->addSql('ALTER TABLE ligne_rapport ADD CONSTRAINT FK_21AD9EA51351003D FOREIGN KEY (test_case_id) REFERENCES test_case (id)');
        $this->addSql('ALTER TABLE sprint ADD CONSTRAINT FK_EF8055B7166D1F9C FOREIGN KEY (project_id) REFERENCES test_project (id)');
        $this->addSql('ALTER TABLE test_case ADD CONSTRAINT FK_7D71B3CB31025FCC FOREIGN KEY (use_case_id) REFERENCES use_case (id)');
        $this->addSql('ALTER TABLE use_case ADD CONSTRAINT FK_E7240AC08C24077B FOREIGN KEY (sprint_id) REFERENCES sprint (id)');
        $this->addSql('ALTER TABLE use_case ADD CONSTRAINT FK_E7240AC0E04E49DF FOREIGN KEY (scenario_id) REFERENCES scenario (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE affectation DROP FOREIGN KEY FK_F4DD61D353C59D72');
        $this->addSql('ALTER TABLE affectation_user DROP FOREIGN KEY FK_68F8B1676D0ABA22');
        $this->addSql('ALTER TABLE affectation_user DROP FOREIGN KEY FK_68F8B167A76ED395');
        $this->addSql('ALTER TABLE affectation_test_project DROP FOREIGN KEY FK_D318B11F6D0ABA22');
        $this->addSql('ALTER TABLE affectation_test_project DROP FOREIGN KEY FK_D318B11F6D5EA9A5');
        $this->addSql('ALTER TABLE execution DROP FOREIGN KEY FK_2A0D73AE04E49DF');
        $this->addSql('ALTER TABLE execution DROP FOREIGN KEY FK_2A0D73A1DFBCC46');
        $this->addSql('ALTER TABLE ligne_rapport DROP FOREIGN KEY FK_21AD9EA51DFBCC46');
        $this->addSql('ALTER TABLE ligne_rapport DROP FOREIGN KEY FK_21AD9EA51351003D');
        $this->addSql('ALTER TABLE sprint DROP FOREIGN KEY FK_EF8055B7166D1F9C');
        $this->addSql('ALTER TABLE test_case DROP FOREIGN KEY FK_7D71B3CB31025FCC');
        $this->addSql('ALTER TABLE use_case DROP FOREIGN KEY FK_E7240AC08C24077B');
        $this->addSql('ALTER TABLE use_case DROP FOREIGN KEY FK_E7240AC0E04E49DF');
        $this->addSql('DROP TABLE affectation');
        $this->addSql('DROP TABLE affectation_user');
        $this->addSql('DROP TABLE affectation_test_project');
        $this->addSql('DROP TABLE execution');
        $this->addSql('DROP TABLE ligne_rapport');
        $this->addSql('DROP TABLE rapport');
        $this->addSql('DROP TABLE refresh_token');
        $this->addSql('DROP TABLE scenario');
        $this->addSql('DROP TABLE sprint');
        $this->addSql('DROP TABLE test_case');
        $this->addSql('DROP TABLE test_project');
        $this->addSql('DROP TABLE use_case');
        $this->addSql('DROP TABLE user');
        $this->addSql('DROP TABLE messenger_messages');
    }
}
