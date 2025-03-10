# The Environment

## Environment Overview

The shell maintains a body of information during our shell session called the environment.

Some programs look for values stored in the environment to adjust their behavior. 


## What Is Stored in the Environment?

The shell stores two basic types of data in the environment: environment variables and shell variables.

Shell variables are bits of data placed there by bash, and environment variables are everything else. 

In addition to variables, the shell stores some programmatic data, namely, aliases and shell functions.


## How Is the Environment Established?

When we log on to the system, the **bash** program starts and reads a series of configuration scripts called **startup files**, which define the default envi- ronment shared by all users.

This is followed by more **startup files in our home directory** that define our personal environment.

The exact sequence depends on the type of shell session being started. There are two kinds:
- A **login shell session** is one in which we are prompted for our username and password (terminal, for example).
- A **non-login shell session** typically occurs when we launch a terminal session in the GUI. non-login shells inherit the environment from their parent process, usually a login shell.


### Starup files for login shell session

- `/etc/profile`: a global configuration script that applies to all users
- `~/.bash_profile`: A user's personal startup file
- `~/.bash_login`: read this file if above file is not found
- `~/.profile`: read this file if above file is not found


### Startup Files for Non-Login Shell Sessions

- `/etc/bash.bashrc`: A global configuration script that applies to all users.
- `~/.bashrc`: A user’s personal startup file. It can be used to extend or override settings in the global configuration script.

The `~/.bashrc` is the most important startup file, since it is almost always read (both login shell and non-login shell).


## Modifying the Environment

To add directories to your `PATH` or define additional environment variables, place those changes in `.bash_profile` (or the equivalent, according to your distribution; for example, Ubuntu uses .profile)

For everything else, place the changes in `.bashrc`.

The changes we have made to our `.bashrc` will not take effect until we close our terminal session and start a new one, because the `.bashrc` file is read only at the beginning of a session.

We can force bash to reread the modified `.bashrc` file with the following command:
```sh
source .bashrc
```


## View environment variables

Print available environment variables:

```sh
printenv | less
```

View the value of a specific variable:
```sh
printenv USER
```

```sh
echo $HOME
```


## Interesting Variables

| Variable | Contents |
|---|---|
| DISPLAY | The name of your display if you are running a graphical environment. Usually this is `:0`, meaning the first display generated by the X server. |
| EDITOR | The name of the program to be used for text editing. |
| SHELL | The name of your shell program. |
| HOME | The pathname of your home directory. |
| LANG | Defines the character set and collation order of your language. |
| OLDPWD | The previous working directory. |
| PAGER | The name of the program to be used for paging output. This is often set to `/usr/bin/less`. |
| PATH | A colon-separated list of directories that are searched when you enter the name of a executable program. |
| PS1 | Stands for "prompt string 1." This defines the contents of the shell prompt. |
| PWD | The current working directory. |
| TERM | The name of your terminal type. Unix-like systems support many terminal protocols; this variable sets the protocol to be used with your terminal emulator. |
| TZ | Specifies your time zone. Most Unix-like systems maintain the computer's internal clock in Coordinated Universal Time (UTC) and then display the local time by applying an offset specified by this variable. |
| USER | Your username. |


## Zsh

**Zsh (Z shell)** is a powerful Unix shell that serves as an improved alternative to the Bourne shell. It offers robust capabilities and extensive customization options.

To make an environment variable persist in Zsh, add it to the `.zshrc` shell configuration file.

If the file doesn't exist, create it using a text editor (e.g., `vi ~/.zshrc`).

Save the file and reinitialize the configuration using:
```
source ~/.zshrc
```
