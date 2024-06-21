# Task Management System



## Overview


The front-end of the we application has been developed by React JS and the Back-end by Flask. The back-end has been deployed on render at (https://task-management-system-backend-39v0.onrender.com/user). The app allows users to sign-up, sign-in and get, delete, and post new tasks. The tasks can be performed by one person or multiple people. Moreover, users can through the review provide insight regarding the status of a task such as whether it is complete or incomplete and provide feedback on a given task. 



## Tools


The app has been developed using the following tools:

* React JS
  
* HTML 5

* CSS 3
  
    
To view or manipulate the code you need to use one of the following code editors [VSCode](https://www.hostinger.com/tutorials/best-code-editors#1_Visual_Studio_Code), or any other online Javascript, CSS and HTML compiler or browser.


## Set-up


### Preliquisites

For the project to run the following should be fullfilled:

* Operating system: Linus, Windows, or MacOS.
  
* 4GB RAM
  
* 100MB storage
  
### Steps

1. Clone the repo in your machine using the ssh ```g```

2. Use ```cd superheroes-jackson-njihia``` to navigate to the directory where it has been cloned.

3. Run ```code . ``` to open the repository in VSCode.
  
4. To create a virtual environmentopen the terminal and run ``` python -m venv env```  and activate it using  ``` source env/bin/activate``` 

5. To install the required resources run ``` pip install -r requirements.txt``` 

6.  To run the app in the terminal use ``` python main.py```  or ``` python3 main.py```

7.  **Optional** (the repo already contains the db; however if it is not present you can create it using

                flask db init
    
                flask db migrate -m "initial migration" (this will lead to a creation of a new file in versions)
    
                flask db upgrade (this will commit the creation of the database)

   
8. Seed the database using ``` python seed.py``` and use the [``` curl commands ```](https://sqlite.org/cli.html) or installed db viewer or external database tool to confirm it is populated.

**NB**
You can also use sudo to manualy install the necessary dependences such as 

```sudo snap install postman```

9. To run Postman (open a different terminal from the one running the app, if you want to view simulteneously on browser or perform other ```curl``` methods) run ```postman```

## Demo

(*The demo uses a different port from that specified in the app*)

**GET /heroes** 

![Browser showing get/heroes](https://github.com/Moringa-SDF-PTO5/superheroes-jackson-njihia/assets/152980044/a25ad2f3-aa80-486e-bfdd-ce2196f4f8bb


 ![Postman showing get/heroes](https://github.com/Moringa-SDF-PTO5/superheroes-jackson-njihia/assets/152980044/d25ef07b-0623-4f07-857b-19a593ac68ed)


**GET /powers** 


![Postman showing get/powers](https://github.com/Moringa-SDF-PTO5/superheroes-jackson-njihia/assets/152980044/c0e5a93f-d512-4b3d-952c-334eddfc0fb1)


**GET /heroes/:id**


![Showing hero by id=3](https://github.com/Moringa-SDF-PTO5/superheroes-jackson-njihia/assets/152980044/ae9f8c20-ae51-4e2d-83f8-954e28ef314a)



 **GET /powers/:id**
 

![Postman showing invalid power id](https://github.com/Moringa-SDF-PTO5/superheroes-jackson-njihia/assets/152980044/095a0249-e780-475e-9136-20cc1dd92f28)


**PATCH /powers/:id**


![Showing patch involving a change in the description of a power](https://github.com/Moringa-SDF-PTO5/superheroes-jackson-njihia/assets/152980044/e29e6383-b9ef-4314-84f9-36f7db75609d)



## Author
The repo has been created and is currently being maintained by:

- Andrew Langat

- Brian 
- Barbra Tess

- Jackson Njihia


## Lisence

### MIT 2.0

Copyright (c) <2024> <Jackson Njihia>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


  

