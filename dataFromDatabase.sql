USE [ContactAppDb]
GO
/****** Object:  Table [dbo].[Contacts]    Script Date: 05/06/2023 16:40:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Contacts](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Firstname] [nvarchar](max) NULL,
	[Lastname] [nvarchar](max) NULL,
	[Adress] [nvarchar](max) NULL,
 CONSTRAINT [PK_Contacts] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Emails]    Script Date: 05/06/2023 16:40:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Emails](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ContactEmail] [nvarchar](max) NULL,
	[ContactId] [int] NOT NULL,
 CONSTRAINT [PK_Emails] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Numbers]    Script Date: 05/06/2023 16:40:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Numbers](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ContactNum] [nvarchar](max) NULL,
	[ContactId] [int] NOT NULL,
 CONSTRAINT [PK_Numbers] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Contacts] ON 

INSERT [dbo].[Contacts] ([Id], [Firstname], [Lastname], [Adress]) VALUES (1, N'Katarina', N'Bitunjac', N'Sinj')
INSERT [dbo].[Contacts] ([Id], [Firstname], [Lastname], [Adress]) VALUES (2, N'Maja', N'Beslic', N'Sinj')
INSERT [dbo].[Contacts] ([Id], [Firstname], [Lastname], [Adress]) VALUES (3, N'Josip', N'Krolo', N'Split')
SET IDENTITY_INSERT [dbo].[Contacts] OFF
GO
SET IDENTITY_INSERT [dbo].[Emails] ON 

INSERT [dbo].[Emails] ([Id], [ContactEmail], [ContactId]) VALUES (1, N'sreca@gmail.com', 1)
INSERT [dbo].[Emails] ([Id], [ContactEmail], [ContactId]) VALUES (2, N'maja@gmail.com', 2)
INSERT [dbo].[Emails] ([Id], [ContactEmail], [ContactId]) VALUES (3, N'josip@gmail.com', 3)
INSERT [dbo].[Emails] ([Id], [ContactEmail], [ContactId]) VALUES (4, N'majstor1@gmail.com', 3)
SET IDENTITY_INSERT [dbo].[Emails] OFF
GO
SET IDENTITY_INSERT [dbo].[Numbers] ON 

INSERT [dbo].[Numbers] ([Id], [ContactNum], [ContactId]) VALUES (1, N'091478526', 1)
INSERT [dbo].[Numbers] ([Id], [ContactNum], [ContactId]) VALUES (2, N'0913369874', 2)
INSERT [dbo].[Numbers] ([Id], [ContactNum], [ContactId]) VALUES (3, N'0974561233', 3)
INSERT [dbo].[Numbers] ([Id], [ContactNum], [ContactId]) VALUES (4, N'0995821466', 3)
SET IDENTITY_INSERT [dbo].[Numbers] OFF
GO
ALTER TABLE [dbo].[Emails]  WITH CHECK ADD  CONSTRAINT [FK_Emails_Contacts_ContactId] FOREIGN KEY([ContactId])
REFERENCES [dbo].[Contacts] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Emails] CHECK CONSTRAINT [FK_Emails_Contacts_ContactId]
GO
ALTER TABLE [dbo].[Numbers]  WITH CHECK ADD  CONSTRAINT [FK_Numbers_Contacts_ContactId] FOREIGN KEY([ContactId])
REFERENCES [dbo].[Contacts] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Numbers] CHECK CONSTRAINT [FK_Numbers_Contacts_ContactId]
GO
