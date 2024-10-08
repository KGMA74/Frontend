

INSERT INTO api_votetype (vote_type) VALUES ('upvote'), ('downvote');


INSERT INTO api_postcategory (name, description) VALUES 
('Comment', 'A type of post used to make comments'),
('Question', 'A type of post used to ask questions'),
('Answer', 'A type of post used to respond to a question'),
('Announcement', 'A type of post for important community announcements'),
('Discussion', 'A type of post for general discussions'),
('Tutorial', 'A type of post used for detailed guides and tutorials'),
('Suggestion', 'A type of post for proposing new features or improvements'),
('Bug', 'A type of post used to report bugs or technical issues');


INSERT INTO api_tag (name, description) VALUES
('Python', 'High-level programming language known for its readability and versatility.'),
('JavaScript', 'High-level programming language commonly used for web development.'),
('React', 'JavaScript library for building user interfaces.'),
('Vue.js', 'Progressive JavaScript framework for building UIs.'),
('Angular', 'Platform and framework for building single-page client applications using HTML and TypeScript.'),
('Node.js', 'JavaScript runtime built on Chrome''s V8 JavaScript engine.'),
('Django', 'High-level Python web framework that encourages rapid development and clean, pragmatic design.'),
('Flask', 'Lightweight WSGI web application framework in Python.'),
('Express.js', 'Fast, unopinionated, minimalist web framework for Node.js.'),
('Ruby on Rails', 'Open-source web framework written in Ruby.'),
('Laravel', 'PHP web framework for web artisans.'),
('Spring Boot', 'Java-based framework for building production-ready applications.'),
('ASP.NET Core', 'Cross-platform, high-performance framework for building modern, cloud-based, and internet-connected applications.'),
('Flutter', 'UI toolkit for building natively compiled applications for mobile, web, and desktop from a single codebase.'),
('Swift', 'Powerful and intuitive programming language for macOS, iOS, watchOS, and tvOS.'),
('Kotlin', 'Statically typed programming language for modern multiplatform applications.'),
('TensorFlow', 'Open-source machine learning framework developed by Google.'),
('PyTorch', 'Open-source machine learning library based on Torch, used for applications such as computer vision and natural language processing.'),
('Ruby', 'Dynamic, reflective, object-oriented programming language.'),
('C#', 'General-purpose, multi-paradigm programming language developed by Microsoft.'),
('Java', 'Class-based, object-oriented programming language designed for general-purpose use in the enterprise environment.'),
('PHP', 'Server-side scripting language designed for web development, but also used as a general-purpose programming language.'),
('Go', 'Open-source programming language that makes it easy to build simple, reliable, and efficient software.'),
('Rust', 'Systems programming language that runs blazingly fast, prevents segfaults, and guarantees thread safety.'),
('TypeScript', 'Typed superset of JavaScript that compiles to plain JavaScript.'),
('HTML', 'Standard markup language for creating web pages and web applications.'),
('CSS', 'Style sheet language used for describing the presentation of a document written in HTML or XML.'),
('Sass', 'CSS extension language that helps keep large stylesheets organized and allows for reusable styles.'),
('Less', 'CSS preprocessor, meaning that it extends the CSS language, adding features that allow variables, mixins, functions, and many other techniques that allow you to make CSS that is more maintainable, themeable and extendable.'),
('Bootstrap', 'Front-end framework for developing responsive and mobile-first websites.'),
('TailwindCSS', 'Utility-first CSS framework for rapidly building custom designs.'),
('Material-UI', 'React UI framework for Google''s Material Design system.'),
('Ant Design', 'Design system for enterprise-level products. It provides a set of high-quality React components and demos for building rich, interactive user interfaces.'),
('UIKit', 'Lightweight and modular front-end framework for developing fast and powerful web interfaces.'),
('Foundation', 'Responsive front-end framework that makes it easy to design beautiful responsive websites, apps and emails that look amazing on any device.'),
('jQuery', 'Fast, small, and feature-rich JavaScript library.'),
('React Native', 'Framework for building native apps using React.'),
('Ionic', 'Cross-platform mobile app development framework that helps build apps for iOS, Android, and the web.'),
('Xamarin', 'Microsoft-owned framework that allows you to build apps for iOS, Android, and Windows using C# and .NET.'),
('Electron', 'Framework for building cross-platform desktop applications with web technologies.'),
('Unity', 'Cross-platform game engine developed by Unity Technologies.'),
('Unreal Engine', 'Game engine developed by Epic Games, first showcased in the 1998 first-person shooter game Unreal.'),
('MongoDB', 'Document-oriented NoSQL database program, providing high performance, high availability, and easy scalability.'),
('MySQL', 'Open-source relational database management system.'),
('PostgreSQL', 'Open-source relational database management system emphasizing extensibility and SQL compliance.'),
('SQLite', 'Self-contained, serverless, zero-configuration, transactional SQL database engine.'),
('Redis', 'In-memory data structure store used as a database, cache, and message broker.'),
('Elasticsearch', 'Distributed, RESTful search and analytics engine designed for horizontal scalability, reliability, and real-time search.'),
('Apache Kafka', 'Distributed event streaming platform capable of handling trillions of events a day.'),
('RabbitMQ', 'Open-source message-broker software (sometimes called message-oriented middleware) that originally implemented the Advanced Message Queuing Protocol (AMQP).'),
('GraphQL', 'Query language for APIs and runtime for executing those queries with your existing data.'),
('REST API', 'Architectural style for designing networked applications.'),
('SOAP', 'Protocol specification for exchanging structured information in the implementation of web services in computer networks.'),
('OAuth', 'Open standard for access delegation, commonly used as a way for Internet users to grant websites or applications access to their information on other websites without giving them the passwords.'),
('JSON Web Tokens (JWT)', 'JSON-based open standard (RFC 7519) for creating access tokens that assert some number of claims.'),
('Docker', 'Platform for developing, shipping, and running applications using containerization technology.'),
('Kubernetes', 'Open-source container orchestration system for automating application deployment, scaling, and management.'),
('Jenkins', 'Open-source automation server that helps automate the non-human part of the software development process.'),
('Git', 'Distributed version control system for tracking changes in source code during software development.'),
('GitHub', 'Web-based hosting service for version control using Git.'),
('Bitbucket', 'Web-based platform for hosting code repositories using Git and Mercurial version control systems.'),
('AWS', 'Amazon Web Services, a comprehensive, evolving cloud computing platform provided by Amazon.'),
('Azure', 'Cloud computing service created by Microsoft for building, testing, deploying, and managing applications and services through Microsoft-managed data centers.'),
('Google Cloud Platform (GCP)', 'Suite of cloud computing services that runs on the same infrastructure that Google uses internally for its end-user products.'),
('Firebase', 'Platform developed by Google for creating mobile and web applications.'),
('Heroku', 'Cloud platform as a service supporting several programming languages.'),
('DigitalOcean', 'Cloud infrastructure provider that provisions virtual servers (droplets) for developers.'),
('Ansible', 'Open-source software provisioning, configuration management, and application-deployment tool.'),
('Chef', 'Configuration management tool written in Ruby and Erlang.'),
('Puppet', 'Configuration management tool written in Ruby and Clojure.'),
('Terraform', 'Infrastructure as code software tool that provides a consistent CLI workflow to manage hundreds of cloud services.'),
('Prometheus', 'Open-source systems monitoring and alerting toolkit.'),
('Grafana', 'Open-source platform for monitoring and observability.'),
('ELK Stack (Elasticsearch, Logstash, Kibana)', 'Centralized logging solution, combining Elasticsearch for searching and analyzing data in real-time, Logstash for centralized logging, and Kibana for visualizing data.');