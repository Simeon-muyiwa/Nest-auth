FROM quay.io/operator-framework/ansible-operator:v1.33.0

# Set environment variables
ENV HOME /home/ansible

# Switch to the root user to perform operations that require elevated permissions
USER root

# Copy requirements.yml and install collections
COPY requirements.yml ${HOME}/requirements.yml
RUN ansible-galaxy collection install -r ${HOME}/requirements.yml \
    && chmod -R ug+rwx ${HOME}/.ansible

# Copy other necessary files
COPY watches.yaml ${HOME}/watches.yaml
COPY roles/ ${HOME}/roles/
COPY playbooks/ ${HOME}/playbooks/

# Create ansible.cfg in a writable location
RUN echo "[defaults]\nroles_path = ${HOME}/roles\nlibrary = /usr/share/ansible/openshift\nlocal_tmp = /tmp/.ansible\nremote_tmp = /tmp/.ansible" > /etc/ansible/ansible.cfg

# Optionally, switch back to the original user if required
USER ansible

# Set the command to run the playbook
CMD ["ansible-playbook", "-vvv", "${HOME}/playbooks/nestjs.yml"]