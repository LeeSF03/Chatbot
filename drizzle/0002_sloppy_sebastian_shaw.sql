CREATE TABLE `messages` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`conversation_id` integer,
	`message` text NOT NULL,
	`type` text NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`conversation_id`) REFERENCES `conversations`(`id`) ON UPDATE no action ON DELETE no action
);

CREATE INDEX `id_index` ON `messages` (`id`);
CREATE INDEX `conversation_id_index` ON `messages` (`conversation_id`);