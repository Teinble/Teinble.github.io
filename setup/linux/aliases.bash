# Enable color support of ls and also add handy aliases.
if [ -x /usr/bin/dircolors ]; then
    test -r ~/.dircolors && eval "$(dircolors -b ~/.dircolors)" || eval "$(dircolors -b)"
    alias ls='ls --color=auto'
    #alias dir='dir --color=auto'
    #alias vdir='vdir --color=auto'

    alias grep='grep --color=auto'
    alias fgrep='fgrep --color=auto'
    alias egrep='egrep --color=auto'
fi

# Some more ls aliases.
alias ll='ls -alF'
alias la='ls -A'
alias l='ls -CF'

if command -v bat >/dev/null 2>&1; then
    alias b='bat --paging=never'
    alias bp='bat'
fi

# Add an "alert" alias for long running commands. Use like so:
#   sleep 10; alert
alias alert='notify-send --urgency=low -i "$([ $? = 0 ] && echo terminal || echo error)" "$(history|tail -n1|sed -e '\''s/^\s*[0-9]\+\s*//;s/[;&|]\s*alert$//'\'')"'

# Keep Ubuntu's conventional per-user alias file supported.
[ -f "$HOME/.bash_aliases" ] && . "$HOME/.bash_aliases"

# Shorcuts related to virtualenv activation
alias va='source .venv/bin/activate'
alias sqme='squeue -u $USER'

# Shortcuts to see the GPUs status
alias nvitop="uvx nvitop"
alias gsta="git status"
