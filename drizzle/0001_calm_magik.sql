CREATE TABLE `conversations` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
DROP TABLE `users`;--> statement-breakpoint
CREATE INDEX `id_index` ON `conversations` (`id`);