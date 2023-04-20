LOAD DATA LOCAL INFILE '/Users/manaszagade/Study/ADT/Project/qs-world-university-rankings-2017-to-2022-V2.csv'  
 INTO TABLE countries 
 FIELDS TERMINATED BY ','    
 ENCLOSED BY '"'
LINES TERMINATED BY '\n'  
IGNORE 1 ROWS
(@university,@year,@rank,@score,@link,@country, @city,@region,@logo,@unitype,@research_output,@student_faculty_ratio,@international_students,@size,@faculty_count) -- Select columns from the CSV file

 SET `country`   = @country
 ;
 
LOAD DATA LOCAL INFILE '/Users/manaszagade/Study/ADT/Project/qs-world-university-rankings-2017-to-2022-V2.csv'  IGNORE
 INTO TABLE research_outputs 
 FIELDS TERMINATED BY ','    
 ENCLOSED BY '"'
LINES TERMINATED BY '\n'  
IGNORE 1 ROWS
(@university,@year,@rank,@score,@link,@country, @city,@region,@logo,@unitype,@research_output,@student_faculty_ratio,@international_students,@size,@faculty_count) -- Select columns from the CSV file

 SET `research_output`   = @research_output
 ;
 
  LOAD DATA LOCAL INFILE '/Users/manaszagade/Study/ADT/Project/qs-world-university-rankings-2017-to-2022-V2.csv'  IGNORE
 INTO TABLE regions 
 FIELDS TERMINATED BY ','    
 ENCLOSED BY '"'
LINES TERMINATED BY '\n'  
IGNORE 1 ROWS
(@university,@year,@rank,@score,@link,@country, @city,@region,@logo,@unitype,@research_output,@student_faculty_ratio,@international_students,@size,@faculty_count) -- Select columns from the CSV file

 SET `region`   = @region
 ;
 
  LOAD DATA LOCAL INFILE '/Users/manaszagade/Study/ADT/Project/qs-world-university-rankings-2017-to-2022-V2.csv'  IGNORE
 INTO TABLE sizes 
 FIELDS TERMINATED BY ','    
 ENCLOSED BY '"'
LINES TERMINATED BY '\n'  
IGNORE 1 ROWS
(@university,@year,@rank,@score,@link,@country, @city,@region,@logo,@unitype,@research_output,@student_faculty_ratio,@international_students,@size,@faculty_count) -- Select columns from the CSV file

 SET `size`   = @size
 ;
 
  LOAD DATA LOCAL INFILE '/Users/manaszagade/Study/ADT/Project/qs-world-university-rankings-2017-to-2022-V2.csv'  IGNORE
 INTO TABLE unitypes 
 FIELDS TERMINATED BY ','    
 ENCLOSED BY '"'
LINES TERMINATED BY '\n'  
IGNORE 1 ROWS
(@university,@year,@rank,@score,@link,@country, @city,@region,@logo,@unitype,@research_output,@student_faculty_ratio,@international_students,@size,@faculty_count) -- Select columns from the CSV file

 SET `unitype`   = @unitype
 ;
 
  LOAD DATA LOCAL INFILE '/Users/manaszagade/Study/ADT/Project/qs-world-university-rankings-2017-to-2022-V2.csv'  IGNORE
 INTO TABLE universities 
 FIELDS TERMINATED BY ','    
 ENCLOSED BY '"'
LINES TERMINATED BY '\n'  
IGNORE 1 ROWS
(@university,@year,@rank,@score,@link,@country, @city,@region,@logo,@unitype,@research_output,@student_faculty_ratio,@international_students,@size,@faculty_count) -- Select columns from the CSV file

SET `university`=@university,
`city`=@city,
`country_id` = (SELECT id FROM countries WHERE country = @country),
 -- Map column1 with values from mapping_table
`region_id` = (SELECT id FROM regions WHERE region = @region),
`link`=@link,
`logo`=@logo,
`unitype_id`=(SELECT id from unitypes where unitype= @unitype),
`research_output_id` = (SELECT id FROM research_outputs WHERE research_output = @research_output),
`student_faculty_ratio`= REPLACE(student_faculty_ratio ,',','')  ,
`international_students`=REPLACE(international_students,',','' ),
`size_id` = (SELECT id FROM sizes WHERE size = @size),
`faculty_count`=REPLACE(@faculty_count,',','')
 ;
 