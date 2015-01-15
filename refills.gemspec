# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'refills/version'

Gem::Specification.new do |s|
  s.name          = 'refills'
  s.version       = Refills::VERSION
  s.authors       = ['Christian Reuter', 'Joël Quenneville', 'Lisa Sy', 'Magnus Gyllensward', 'Paul Smith', 'Tyson Gach']
  s.email         = 'design+bourbon@thoughtbot.com'
  s.description   = 'Prepackaged patterns and components built with Bourbon, Neat and Bitters.'
  s.summary       = 'Prepackaged patterns and components built with Bourbon, Neat and Bitters.'
  s.homepage      = 'http://refills.bourbon.io'
  s.license       = 'MIT'

  s.files         = `git ls-files`.split($/)
  s.test_files    = s.files.grep(%r{^(test|spec|features)/})
  s.require_paths = ['lib']

  s.add_development_dependency 'bundler', '~> 1.3'
  s.add_development_dependency 'rake'
end
