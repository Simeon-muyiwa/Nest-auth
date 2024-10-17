FROM quay.io/operator-framework/ansible-operator:v1.33.0

# Create a non-root user and group with specific UID and GID
RUN groupadd -g 1000 appgroup && useradd -u 1000 -g appgroup -m appuser

# Set the home directory for the user
ENV HOME=/home/appuser

# Switch to the non-root user
USER appuser

# Copy requirements and install them
COPY requirements.yml ${HOME}/requirements.yml
RUN ansible-galaxy collection install -r ${HOME}/requirements.yml \
    && chmod -R ug+rwx ${HOME}/.ansible

# Copy necessary files
COPY watches.yaml ${HOME}/watches.yaml
COPY roles/ ${HOME}/roles/
COPY playbooks/ ${HOME}/playbooks/

# Set permissions for copied files
RUN chmod -R ug+rwx ${HOME}/roles ${HOME}/playbooks ${HOME}/watches.yaml

# Set the working directory
WORKDIR ${HOME}

