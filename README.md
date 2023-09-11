# UPRM INTERACTIVE MAP
Our project's mission is to facilitate new students' navigation of the university campus, promoting confidence and a sense of belonging while reducing stress. We aim to simplify campus exploration, contributing to students' academic success and personal growth.

## Features
- ### Interactive Campus Map
  - A user-friendly map interface to explore the campus.
  - Building markers that can be clicked to access building information.

- ### Index for Building Selection
  - An index or search functionality to quickly find and select specific buildings.

- ### Search and Filter
  - A search bar to find a specific building.

- ### Course Schedule Integration
  - A feature to input and manage course schedules for each user.

- ### Building Identifier
  - An identifier such as a pinpoint will be used to show selected buildings on the map.

- ### Building Information Panels
  - Detailed building information displayed in a separate panel or window.

- ### Class Schedule Display
  - A view of the user's class schedule within selected buildings.

- ### 3D Building Exploration
  - An option to view buildings in 3D for a more immersive experience.

- ### User Profile
  - User account with profiles to save course schedule and relevant information.

## Architecture
* Front-End:
     - ASP.NET Razor Pages for the front-end. It's a framework for building web applications that combines C# and HTML. With it, we're hoping to create:

        --Interactive Campus Map: A user-friendly map for exploring the campus with clickable building markers.

        --Building Information Panels: Detailed building info displayed when clicking on markers.

        --User Profiles: User accounts to save schedules and preferences.

        --Index for Building Selection: A quick way to find and select buildings.

        --3D Building Exploration: Optional 3D view for a more immersive experience.
    - Some Packages that may be need to download for the project apart from ASP.net 7.0.4 are these:
        dotnet tool uninstall --global dotnet-aspnet-codegenerator
        dotnet tool install --global dotnet-aspnet-codegenerator
        dotnet tool uninstall --global dotnet-ef
        dotnet tool install --global dotnet-ef
        dotnet add package Microsoft.EntityFrameworkCore.Design
        dotnet add package Microsoft.EntityFrameworkCore.SQLite
        dotnet add package Microsoft.VisualStudio.Web.CodeGeneration.Design
        dotnet add package Microsoft.EntityFrameworkCore.SqlServer
        dotnet add package Microsoft.EntityFrameworkCore.Tools
* Back-End:
    - We have chosen to use Supabase. Supabase is a cloud-based platform that offers a suite of services for building and managing databases, authentication, and APIs. Here's how we are utilizing Supabase, it offers the following key features and services:

        --Database: Supabase includes a PostgreSQL database that we can use to store and manage data related to user profiles, course schedules, building information, and more. It allows us to create and manage database tables easily.

        --Authentication: Supabase provides user authentication services, allowing us to implement user account management, registration, login, and security features. This ensures that each student has a personalized experience with their saved data.

        --APIs: Supabase also offers the ability to create custom APIs, which can be used to handle data retrieval and manipulation. For example, we can use APIs to fetch building information from the database and deliver it to the front-end.

        --Real-Time Updates: Supabase supports real-time data updates, which can be beneficial for features like class schedule display and building availability notifications.

By combining ASP.NET Razor Pages on the front-end and Supabase on the back-end, we create a powerful and scalable architecture for our UPRM Interactive Map project. This architecture allows us to provide a user-friendly, interactive, and data-driven experience to new students, helping them navigate the campus with confidence and ease.
