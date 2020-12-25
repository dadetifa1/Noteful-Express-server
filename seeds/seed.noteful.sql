INSERT INTO noteful_folder ("id", "name")
select 1, 'Important' union 
select 2, 'Super' union 
select 3, 'Spangley' union 
select 4, 'Winning';

INSERT INTO noteful_notes ("name", "content", folder_id, modified)
 select 'Plane', 'Accusamus velit quo corrupti maiores. Perferendis explicabo aut facere aut impedit sed architecto.' , 1 , now() union
 select 'Car', 'Et magnam numquam distinctio quae sunt maxime et. Odio magnam eum repudiandae eos officiis aut. Aliquid molestiae non et sit laudantium aut explicabo voluptatem. Ab ex ut alias quidem.' , 2 , now() union 
 select 'Animals', 'Necessitatibus consectetur omnis illum fugiat distinctio aliquam. Perferendis repellendus nihil aut fuga in laboriosam quis. Adipisci ipsam eos nihil. Eaque autem beatae ut. Molestiae unde at iure voluptatem laudantium tenetur est voluptatibus. Debitis ad blanditiis harum. Sunt voluptas aut id quod rerum velit omnis ea.' , 3, now() union 
 select 'Coding', 'Illum ducimus soluta repellat illo consequatur sed. Est animi beatae dolor qui veritatis earum. Voluptas asperiores a et ipsam repellendus voluptatum occaecati dolores necessitatibus. Voluptatibus sed perspiciatis voluptas illo suscipit. Soluta et voluptatum autem ratione.' , 4, now();
 

