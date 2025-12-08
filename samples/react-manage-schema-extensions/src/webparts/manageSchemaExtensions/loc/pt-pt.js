define([], function() {
  return {
    // Property Pane
    "PropertyPaneDescription": "Descrição",
    "BasicGroupName": "Nome do Grupo",
    "DescriptionFieldLabel": "Campo de Descrição",
    // General
    "Loading": "A carregar...",
    "Error": "Erro",
    "Success": "Sucesso",
    "Cancel": "Cancelar",
    "Save": "Guardar",
    "Close": "Fechar",
    "Delete": "Eliminar",
    "Create": "Criar",
    "Edit": "Editar",
    "View": "Ver",
    "Yes": "Sim",
    "No": "Não",
    "Back": "Voltar",
    "Next": "Seguinte",
    "Previous": "Anterior",
    "Refresh": "Actualizar",
    
    // Access Information
    "AccessRestrictedTitle": "Acesso Restrito",
    "AccessRestrictedMessage": "A gestão de Extensões de Esquema requer que o utilizador tenha acesso total ao Catálogo de Aplicações do Site do inquilino Microsoft 365.",
    "AccessRestrictedDetails": "Esta Aplicação utiliza funcionalidades que requerem acesso de leitura e escrita às propriedades do inquilino.",
    
    // Schema Extensions Toolbar
    "NewButtonLabel": "Novo",
    "NewButtonTooltip": "Adicionar nova extensão de esquema",
    "EditButtonLabel": "Editar",
    "EditButtonTooltip": "Editar extensão de esquema seleccionada",
    "EditButtonTooltipNoSelection": "Seleccione uma extensão de esquema para editar",
    "EditButtonTooltipDisabled": "A extensão de esquema seleccionada não pode ser editada",
    "ViewButtonLabel": "Ver",
    "ViewButtonTooltip": "Ver extensão de esquema seleccionada",
    "ViewButtonTooltipNoSelection": "Seleccione uma extensão de esquema para ver", 
    "DeleteButtonLabel": "Eliminar",
    "DeleteButtonTooltip": "Eliminar extensão de esquema seleccionada",
    "DeleteButtonTooltipNoSelection": "Seleccione uma extensão de esquema para eliminar",
    "DeleteButtonTooltipDisabled": "A extensão de esquema seleccionada não pode ser eliminada",
    "ChangeStatusButtonLabel": "Alterar Estado",
    "ChangeStatusButtonTooltip": "Alterar estado da extensão de esquema seleccionada",
    "ChangeStatusButtonTooltipNoSelection": "Seleccione uma extensão de esquema para alterar o estado",
    "RefreshButtonLabel": "Actualizar",
    "RefreshButtonTooltip": "Actualizar lista de extensões de esquema",
    "ToolbarAriaLabel": "Acções de Extensões de Esquema",
    
    // Empty State
    "NoSchemaExtensionsFoundTitle": "Nenhuma Extensão de Esquema Encontrada",
    "NoSchemaExtensionsFoundDescription": "Comece por criar a sua primeira extensão de esquema para expandir recursos do Microsoft Graph com propriedades personalizadas.",
    "CreateSchemaButtonLabel": "Criar Esquema",
    
    // Schema Extension List
    "ExtensionIdColumnHeader": "ID da Extensão",
    "DescriptionColumnHeader": "Descrição",
    "TargetTypesColumnHeader": "Tipos de Destino",
    "StatusColumnHeader": "Estado",
    "OwnerColumnHeader": "Proprietário",
    "PropertiesCountColumnHeader": "Propriedades",
    "ActionsColumnHeader": "Acções",
    
    // Schema Extension Drawer
    "CreateSchemaExtensionTitle": "Criar Extensão de Esquema",
    "UpdateSchemaExtensionTitle": "Actualizar Extensão de Esquema",
    "EditSchemaExtensionTitle": "Editar Extensão de Esquema",
    "ExtensionIdLabel": "ID da Extensão",
    "ExtensionIdPlaceholder": "ex., MinhaEmpresaExtensaoUtilizador",
    "DescriptionLabel": "Descrição",
    "DescriptionPlaceholder": "Descreva o propósito desta extensão de esquema",
    "OwnerLabel": "Proprietário (ID da Aplicação)",
    "OwnerPlaceholder": "ex., 12345678-1234-1234-1234-123456789012",
    "TargetTypesLabel": "Tipos de Destino",
    "PropertiesLabel": "Propriedades",
    "PropertyNameLabel": "Nome da Propriedade",
    "PropertyTypeLabel": "Tipo da Propriedade",
    "PropertyNamePlaceholder": "Nome da propriedade",
    "AddPropertyButtonLabel": "Adicionar Propriedade",
    "RemovePropertyButtonLabel": "Remover Propriedade",
    
    // Info Labels (Schema Extension Drawer)
    "ExtensionIdInfo": "Identificador único para a extensão de esquema (apenas letras, números e sublinhados)",
    "DescriptionInfo": "Breve descrição do propósito desta extensão de esquema",
    "OwnerInfo": "O ID da Aplicação que será proprietária desta extensão de esquema",
    "TargetTypesInfo": "Seleccione a que tipos de recursos do Microsoft Graph esta extensão se aplica",
    "PropertiesInfo": "Defina as propriedades personalizadas para esta extensão de esquema",
    
    // Validation Messages
    "ExtensionIdRequiredError": "ID da Extensão é obrigatório",
    "ExtensionIdInvalidError": "ID da Extensão pode conter apenas letras, números e sublinhados",
    "DescriptionRequiredError": "Descrição é obrigatória",
    "OwnerRequiredError": "Proprietário (ID da Aplicação) é obrigatório",
    "PropertyNameRequiredError": "Nome da propriedade é obrigatório",
    "PropertyNameInvalidError": "Nome da propriedade deve começar com uma letra e conter apenas letras, números e sublinhados",
    "DuplicatePropertyNameError": "Nome de propriedade duplicado",
    
    // App ID Validation Messages
    "AppIdRequiredError": "ID da Aplicação é obrigatório",
    "AppIdInvalidFormatError": "ID da Aplicação deve ter um formato GUID válido",
    "AppIdNotFoundError": "Aplicação não encontrada no Entra ID",
    "AppIdAccessDeniedError": "Acesso negado. Pode não ter permissão para ler esta aplicação",
    "AppIdNotOwnerError": "Não é proprietário desta aplicação",
    "AppIdValidationError": "Falha ao validar aplicação. Verifique o ID da Aplicação e tente novamente",
    "AppIdValidationSuccess": "Proprietário válido da aplicação",
    "AppIdValidatingMessage": "A validar propriedade da aplicação...",
    
    // Success Messages
    "SchemaExtensionCreatedSuccess": "Extensão de esquema criada com sucesso",
    "SchemaExtensionUpdatedSuccess": "Extensão de esquema actualizada com sucesso",
    "SchemaExtensionDeletedSuccess": "Extensão de esquema eliminada com sucesso",
    
    // Error Messages
    "AppCatalogNotFoundError": "URL do catálogo de aplicações não encontrado. Não é possível gerir extensões de esquema.",
    "LoadInitialDataError": "Falha ao carregar dados iniciais",
    "CreateSchemaExtensionError": "Falha ao criar extensão de esquema",
    "UpdateSchemaExtensionError": "Falha ao actualizar extensão de esquema",
    "DeleteSchemaExtensionError": "Falha ao eliminar extensão de esquema",
    
    // Delete Confirmation
    "DeleteSchemaExtensionTitle": "Eliminar Extensão de Esquema",
    "DeleteSchemaExtensionMessage": "Tem a certeza de que deseja eliminar esta extensão de esquema?",
    "DeleteSchemaExtensionConfirm": "Eliminar",
    "DeleteSchemaExtensionCancel": "Cancelar",
    "DeleteSchemaExtensionInProgress": "A eliminar extensão de esquema...",
    
    // Schema Status
    "StatusInDevelopment": "Em Desenvolvimento",
    "StatusAvailable": "Disponível",
    "StatusDeprecated": "Depreciado",
    
    // Target Types
    "TargetTypeUser": "Utilizador",
    "TargetTypeGroup": "Grupo",
    "TargetTypeDevice": "Dispositivo",
    "TargetTypeContact": "Contacto",
    "TargetTypeEvent": "Evento",
    "TargetTypeMessage": "Mensagem",
    "TargetTypePost": "Publicação",
    "TargetTypeOrganization": "Organização",
    
    // Property Types
    "PropertyTypeString": "Texto",
    "PropertyTypeInteger": "Número Inteiro",
    "PropertyTypeBoolean": "Booleano",
    "PropertyTypeDateTime": "Data e Hora",
    "PropertyTypeBinary": "Binário",
    
    // Information Panel
    "InformationPanelTitle": "Gestão de Extensões de Esquema",
    "InformationPanelDescription": "Gerir extensões de esquema personalizadas para recursos do Microsoft Graph",
    
    // Schema Extension Viewer
    "ViewSchemaExtensionTitle": "Detalhes da Extensão de Esquema",
    "SchemaExtensionDetailsTitle": "Detalhes da Extensão",
    "PropertiesTitle": "Propriedades",
    "NoPropertiesMessage": "Nenhumas propriedades definidas",
    
    // Change Status Dialog
    "ChangeStatusTitle": "Alterar Estado do Esquema",
    "ChangeStatusMessage": "Seleccione o novo estado para esta extensão de esquema",
    "ChangeStatusConfirm": "Alterar Estado",
    
    // Restriction Messages
    "SchemaStatusRestrictionTitle": "Restrição de Estado do Esquema",
    "SchemaStatusRestrictionMessage": "Esta extensão de esquema não pode ser editada devido ao seu estado actual",
    "PropertyRestrictionsMessage": "Nota: Os tipos de propriedade Booleano e Número Inteiro não estão disponíveis para os tipos de destino Contacto, Evento, Mensagem e Publicação devido às limitações da API do Microsoft Graph.",
    
    // Loading States
    "LoadingSchemaExtensions": "A carregar extensões de esquema...",
    "CreatingSchemaExtension": "A criar extensão de esquema...",
    "UpdatingSchemaExtension": "A actualizar extensão de esquema...",
    "DeletingSchemaExtension": "A eliminar extensão de esquema...",

    // Change Schema Status
    "ChangeSchemaStatusTitle": "Alterar Estado da Extensão de Esquema",
    "ChangeSchemaStatusDescription": "Actualizar o estado do ciclo de vida da extensão de esquema.",
    "ChangeStatusButtonText": "Alterar Estado",
    "SelectStatusPlaceholder": "Seleccionar novo estado",
    "SelectStatusError": "Por favor seleccione um estado para alterar.",
    "SchemaLifecycleInfo": "As extensões de esquema seguem um ciclo de vida específico:",
    "SchemaLifecycleStages": "EmDesenvolvimento → Disponível → Depreciado",
    "SchemaLifecycleWarning": "Uma vez alterado um estado, não pode ser revertido para um estado anterior.",
    "SchemaLifecycleInfoIntro": "As extensões de esquema seguem um ciclo de vida específico:",
    "SchemaLifecycleInfoStages": "EmDesenvolvimento → Disponível → Depreciado",
    "SchemaLifecycleInfoIrreversible": "Uma vez alterado um estado, não pode ser revertido para um estado anterior.",
    "ChangeStatusOfExtension": "Alterar o estado da extensão de esquema",
    "SchemaIdLabel": "ID do Esquema:",
    "CurrentStatusLabel": "Estado Actual:",
    "NewStatusLabel": "Novo Estado:",
    "CannotChangeStatusMessage": "Não é possível alterar o estado da extensão de esquema",
    "StatusCannotTransition": "não pode ser transferido para qualquer outro estado.",
    "LifecycleIsText": "O ciclo de vida da extensão de esquema é:",
    "InDevelopmentStatus": "EmDesenvolvimento",
    "AvailableStatus": "Disponível",
    "DeprecatedStatus": "Depreciado",
    "InDevelopmentDescription": "Em Desenvolvimento",
    "AvailableDescription": "Disponível - Pronto para uso em produção",
    "DeprecatedDescription": "Depreciado - Já não é suportado",
    "FailedToChangeStatus": "Falha ao alterar estado da extensão de esquema:",

    // Schema Extension Viewer
    "SchemaExtensionDetailsSubtitle": "Detalhes da Extensão de Esquema",
    "NoDataToDisplay": "Nenhuns dados de extensão de esquema para exibir",
    "ExtensionIdTooltip": "Identificador único para a extensão de esquema",
    "NotAssigned": "Não atribuído",
    "DescriptionTooltip": "Descrição do propósito desta extensão de esquema",
    "NoDescriptionProvided": "Nenhuma descrição fornecida",
    "OwnerAppIdLabel": "Proprietário (ID da Aplicação)",
    "OwnerAppIdTooltip": "O ID da Aplicação proprietária desta extensão de esquema",
    "UnknownOwner": "Desconhecido",
    "StatusLabel": "Estado",
    "StatusTooltip": "Estado actual da extensão de esquema",
    "TargetTypesTooltip": "Objectos de directório aos quais esta extensão de esquema pode ser aplicada",
    "PropertiesTooltip": "Propriedades personalizadas definidas para esta extensão de esquema",
    "PropertyNameColumn": "Nome da Propriedade",
    "DataTypeColumn": "Tipo de Dados",
    "NoPropertiesDefined": "Nenhumas propriedades definidas",
    "CloseButtonText": "Fechar",

    // Information Panels
    "SchemaExtensionCreateGuidelinesTitle": "Directrizes de Criação de Extensão de Esquema",
    "StatusGuideline": "Estado:",
    "StatusGuidelineDetails": "Novas extensões de esquema são criadas com o estado \"Em Desenvolvimento\". Depois de ter testado e verificado a extensão, pode alterar o seu estado para \"Disponível\" para a tornar utilizável em cenários de produção.",
    "LimitationsGuideline": "Limitações:",
    "LimitationsGuidelineDetails": "Esteja ciente das limitações após a criação, não pode alterar os tipos de recursos de destino nem remover ou actualizar propriedades personalizadas. Apenas suporte para actualizações aditivas. Por favor",
    "ReviewDocumentationLink": "reveja a documentação",
    "SchemaExtensionUpdateGuidelinesTitle": "Directrizes de Actualização de Extensão de Esquema",
    "AdditiveUpdatesGuideline": "Apenas actualizações aditivas:",
    "AdditiveUpdatesDetails": "Só pode adicionar novas propriedades a extensões de esquema existentes ou alterar a descrição",
    "StatusRequirementGuideline": "Requisito de estado:",
    "StatusRequirementDetails": "Actualizações só são permitidas quando o estado da extensão é \"Em Desenvolvimento\" ou \"Disponível\"",
    "RestrictionsGuideline": "Restrições:",
    "RestrictionsDetails": "Propriedades personalizadas ou tipos de recursos de destino não podem ser removidos da definição uma vez criados",
    "AllowedChangesGuideline": "Alterações permitidas:",
    "AllowedChangesDetails": "Adicionar novas propriedades personalizadas e modificar a descrição da extensão",
    "SupportedDataTypesLink": "Saiba mais sobre tipos de dados de propriedades suportados",
    "SchemaExtensionsInfoDescription": "As extensões de esquema permitem definir propriedades personalizadas para recursos do Microsoft Graph. Permitem expandir o esquema de recursos como utilizadores, grupos e dispositivos com dados adicionais específicos da sua aplicação ou organização.",
    "SchemaExtensionsUseCaseDescription": "Ao criar extensões de esquema, pode armazenar e gerir informações extra que não estão incluídas no esquema padrão fornecido pelo Microsoft Graph. Isto é particularmente útil para cenários onde precisa de capturar dados específicos da aplicação ou metadados relevantes para os seus processos de negócio.",
    "LearnMoreLink": "Saiba mais sobre Extensões de Esquema do Microsoft Graph",

    // Schema Status Restriction Dialog
    "CannotModifyTitle": "Extensão de Esquema Não Pode Ser Modificada",
    "CannotModifyDescription": "Esta extensão de esquema não pode ser modificada devido ao seu estado actual.",
    "CurrentStatusText": "Estado Actual:",
    "UnknownStatus": "Desconhecido",
    "SchemaExtensionIdText": "ID da Extensão de Esquema:",
    "ModificationStatusRequirement": "Extensões de esquema só podem ser modificadas quando o seu estado é \"EmDesenvolvimento\" ou \"Disponível\".",
    "OkButtonText": "OK",

    // Data Grid Skeleton - Headers already defined above
    "PropertiesColumnHeader": "Propriedades",

    // Actions Menu
    "ViewDetailsAction": "Ver Detalhes",
    "ChangeStatusAction": "Alterar Estado",
    "EditAction": "Editar",
    "DeleteAction": "Eliminar",
    "ActionsMenuLabel": "Mais acções",

    // Delete Schema Extension
    "ConfirmDeleteTitle": "Confirmar Eliminação de Extensão de Esquema",
    "ConfirmDeleteDescription": "Esta acção não pode ser anulada.",
    "DeleteDataInfo": "Eliminar uma definição de extensão de esquema não afecta o acesso a dados personalizados que foram adicionados a instâncias de recursos baseadas nessa definição",
    "CannotDeleteMessage": "Não é possível eliminar esta extensão de esquema.",
    "CannotDeleteReasonPrefix": "Apenas extensões de esquema com estado",
    "CannotDeleteReasonSuffix": "podem ser eliminadas.",
    "OnlyInDevelopmentCanDelete": "EmDesenvolvimento",
    "FailedToDeleteError": "Falha ao eliminar extensão de esquema:"
  }
});