# TAR command

## Create an archive (compress)

```bash
tar -czvf file.tar.gz -C /path/to/directory .
tar -cvf files.tar -C /path/to/directory .; gzip -9 files.tar
```

- `-c`: Create an archive.
- `-z`: Compress the archive with gzip.
- `-v`: Display progress in the terminal while creating the archive, also known as “verbose” mode.
- `-f`: Allows you to specify the filename of the archive.
- `-C`: change dir to directory
- `-x`: extract an archive.


## Extract an archive to a directory

```bash
tar -xzvf -C /path/to/dir archive.tar.gz
```


## View archive content

```bash
tar -tvf archive.tar.gz
```