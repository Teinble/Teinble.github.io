# Don't put duplicate lines or lines starting with space in the history.
# See bash(1) for more options.
HISTCONTROL=ignoreboth:erasedups

# Append to the history file, don't overwrite it.
shopt -s histappend

# For setting history length see HISTSIZE and HISTFILESIZE in bash(1).
HISTSIZE=100000
HISTFILESIZE=200000

# Share new commands between interactive shells without rewriting history.
__bash_history_sync() {
    history -a
    history -n
}

case ";${PROMPT_COMMAND:-};" in
    *";__bash_history_sync;"*) ;;
    *) PROMPT_COMMAND="__bash_history_sync${PROMPT_COMMAND:+; $PROMPT_COMMAND}" ;;
esac
